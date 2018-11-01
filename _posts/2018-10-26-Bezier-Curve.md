---
layout: post
comments: true
title:  "[Unity] 베지어 곡선 그리기(Bezier Curves)"
date:   2018-10-26 16:42:30
author: devsaka
categories:
  - Unity
tags:
  - Unity
  - Develop
  - Math
  - Spline
  - Bezier Spline
cover:
---

## 1. 원리

다음 두 사이트를 참조했다.

> [베지어 곡선, 위키백과](https://ko.wikipedia.org/wiki/%EB%B2%A0%EC%A7%80%EC%97%90_%EA%B3%A1%EC%84%A0)
>
> [블로그 안에 있는 gif 파일을 보면 이해가 쉽다](http://blog.naver.com/PostView.nhn?blogId=ratoa&logNo=220649189397)

## 2. 구현

기본적으로 아래의 영상을 참고했다.

> [Bezier Curves in Unity](https://www.youtube.com/watch?v=AxhCKFbIkmM)

여기서 중요한 부분은 

```c#
    private Vector3 CalculateCubicBezierPoint(float t, Vector3 p0, Vector3 p1, Vector3 p2, Vector3 p3)
    {
        // return = (1 - t)3 P0 + 3(1 - t)2 tP1 + 3(1 - t) t2 P2 + t3 P3
        //             uuu * p0 + 3 * uu * t * p1 + 3 * u * tt * p2 + ttt * p3

        float u = 1 - t;
        float tt = t * t;
        float uu = u * u;
        float uuu = uu * u;
        float ttt = tt * t;

        Vector3 p = uuu * p0;
        p += 3 * uu * t * p1;
        p += 3 * u * tt * p2;
        p += ttt * p3;

        return p;
    }
```

이 부분이다. 주석친 부분이 3차 베지어 곡선의 공식이다.

코드는 위의 코드를 사용하되, Draw 해주는 함수 내에서, i가 1일 때와 numpoints일 때, 포지션을 처음과 끝 점으로 정해줘야 끊김없이 그릴 수 있다.
