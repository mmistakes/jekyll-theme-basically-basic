---
layout: post
title:  "[Unity] 3D Spline Mesh 만들기 2 - 코드"
date:   2018-10-26 16:08:30
author: devsaka
categories:
  - Unity
tags:
  - Unity
  - Develop
  - Spline Mesh
  - 곡선 메쉬
cover:
comments : true
---

## 0. 참조

메쉬 제작은 아래 링크를 참조했다.

> [Unity 3D 3D bezier Curve Mesh Generator](https://gist.github.com/a-type/b26e8fc02e64da9e9709)

곡선을 만들기 위해서는 여러가지 공식이 있는데 그 중에서도 가장 간단한 베지어 곡선을 사용했다.

> [베지어 곡선 그리기(Bezier Curves)](https://catsirup.github.io/unity/2018/10/26/Bezier-Curve.html)


## 1. 코드 

```c#
    MeshFilter meshFilter = CreateMesh;

    public Mesh CreateMesh()
    {
        Mesh mesh = new Mesh();
        mesh.Clear();
        float scaling = 0.05f;
        float width = DRMath.DenierToDiameter(yarn.thinkness, yarn.filaments);
        List<Vector3> vertList = new List<Vector3>();
        List<int> triList = new List<int>();
        List<Vector2> uvList = new List<Vector2>();
        Vector3 upNormal = new Vector3(0, 0, -1);
        triList.AddRange(new int[] {
                2, 1, 0,    //start face
			    0, 3, 2
            });
        for (int s = 0; s < numPoints; s++)
        {
            float t = ((float)s) / numPoints;
            float futureT = ((float)s + 1) / numPoints;
            Vector3 segmentStart = DRMath.CalculateCubicBezierPoint(t, lerpPosition[0], lerpPosition[1], lerpPosition[2], lerpPosition[3]);
            Vector3 segmentEnd = DRMath.CalculateCubicBezierPoint(futureT, lerpPosition[0], lerpPosition[1], lerpPosition[2], lerpPosition[3]);
            Vector3 segmentDirection = segmentEnd - segmentStart;
            //Debug.Log(segmentDirection);
            if (s == 0 || s == numPoints - 1)
                segmentDirection = new Vector3(0, 1, 0);
            segmentDirection.Normalize();
            Vector3 segmentRight = Vector3.Cross(upNormal, segmentDirection);
            segmentRight *= width;
            Vector3 offset = segmentRight.normalized * (width / 2) * scaling;
            Vector3 br = segmentRight + upNormal * width + offset;
            Vector3 tr = segmentRight + upNormal * -width + offset;
            Vector3 bl = -segmentRight + upNormal * width + offset;
            Vector3 tl = -segmentRight + upNormal * -width + offset;
            int curTriIdx = vertList.Count;
            Vector3[] segmentVerts = new Vector3[]
            {
                segmentStart + br,
                segmentStart + bl,
                segmentStart + tl,
                segmentStart + tr,
            };
            vertList.AddRange(segmentVerts);
            Vector2[] uvs = new Vector2[]
            {
                new Vector2(0, 0),
                new Vector2(0, 1),
                new Vector2(1, 1),
                new Vector2(1, 1)
            };
            uvList.AddRange(uvs);
            int[] segmentTriangles = new int[]
            {
                curTriIdx + 6, curTriIdx + 5, curTriIdx + 1, //left face
				curTriIdx + 1, curTriIdx + 2, curTriIdx + 6,
                curTriIdx + 7, curTriIdx + 3, curTriIdx + 0, //right face
				curTriIdx + 0, curTriIdx + 4, curTriIdx + 7,
                curTriIdx + 1, curTriIdx + 5, curTriIdx + 4, //top face
				curTriIdx + 4, curTriIdx + 0, curTriIdx + 1,
                curTriIdx + 3, curTriIdx + 7, curTriIdx + 6, //bottom face
				curTriIdx + 6, curTriIdx + 2, curTriIdx + 3
            };
            triList.AddRange(segmentTriangles);
            // final segment fenceposting: finish segment and add end face
            if (s == numPoints - 1)
            {
                curTriIdx = vertList.Count;
                vertList.AddRange(new Vector3[] {
                    segmentEnd + br,
                    segmentEnd + bl,
                    segmentEnd + tl,
                    segmentEnd + tr
                });
                uvList.AddRange(new Vector2[] {
                        new Vector2(0, 0),
                        new Vector2(0, 1),
                        new Vector2(1, 1),
                        new Vector2(1, 1)
                    }
                );
                triList.AddRange(new int[] {
                    curTriIdx + 0, curTriIdx + 1, curTriIdx + 2, //end face
					curTriIdx + 2, curTriIdx + 3, curTriIdx + 0
                });
            }
        }
        mesh.vertices = vertList.ToArray();
        mesh.triangles = triList.ToArray();
        mesh.uv = uvList.ToArray();
        mesh.RecalculateNormals();
        mesh.RecalculateBounds();
        return mesh;
    }
```

※ DRMath.CalculateCubicBezierPoint는 베지어 그리기 포스팅에 있으니 참조하면 된다.


이 리턴 값을 MeshFilter에다가 넣어주면 만들어진 메쉬가 보여질 것이다.


## 2. 스크린샷

해당 코드를 이용해 만든 결과물이다.

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/SplineMesh/3D_NoneOptimize.Png){: .align-center}

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/SplineMesh/3D_Optimize.Png){: .align-center}
