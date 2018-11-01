---
layout: post
title:  "[Unity] 3D Spline Mesh 만들기 1 - 기초"
date:   2018-10-26 15:30:30
author: devsaka
categories:
  - Unity
tags:
  - Unity
  - Develop
  - Spline Mesh
  - 곡선 메쉬
cover:
---

회사에서 원단을 표현하기 위해 곡선 메쉬를 만들 일이 있어 검색하면서 공부한 내용이다.

## 0. 시작하기 앞서

DirectX를 공부한 사람은 알고 있겠지만, 기본적으로 메쉬가 만들어지는 원리를 모르면 아래 링크도 보는 것이 좋다.

> [Unite 2015 - A coder's guide to spline-based procedural geometry](https://www.youtube.com/watch?v=o9RK6O2kOKo)

간단하게 몇 가지 용어를 설명해보겠다.

## 1. Triangles

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/SplineMesh/Triangle.png){: .align-center}

메쉬의 기초인 삼각형 어떻게 만들어야 할까?

위의 그림에서 보면 사각형의 각 꼭짓점에 번호를 매겼을 때, 0, 2, 3 과 3, 1, 0 으로 두개의 삼각형을 만들 수 있다.

꼭짓점을 어떻게 연결하든 상관은 없다. 0, 2, 1과 1, 3, 2로 만들 수도 있다.

(단, 1, 0, 2와 0, 2, 3 와 같이 정해버리면 피자 한조각이 떨어져 나간 것처럼 보여질테니 위와 같은 조합으로 하는게 좋다.)


## 2. UV

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/SplineMesh/UV_1.png){: .align-center}

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/SplineMesh/UV_2.png){: .align-center}

UV 는 쉽게 말해서 텍스쳐로 사용할 이미지를 메쉬에 어떤 좌표에 붙여줄 것이냐 라고 생각하면 쉽다.
U와 V는 각각 0에서 1사이의 float 값이다. 



앞서 만들어 놓은 사각형에 순차적으로 값이 들어가기 때문에 역시 설계를 잘 해야 한다.
(0번 꼭짓점에는 좌상단, 1번 꼭짓점은 좌하단과 같이 uvs 배열 안에 순차적으로 값을 넣어주는 것이 나중에 계산하기 편하다)

## 3. Normal

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/SplineMesh/Normal.png){: .align-center}

노말벡터는 법선벡터 혹은 정점벡터라고도 하는데, 쉽게 말해서 면에 대해 수직으로 올라오는 벡터(면이 보고있는 방향으로 올라오는 벡터)라고 볼 수 있다.
보통 방향벡터로 많이 쓰기 때문에 크기를 1로 둔다.


※ 여기서 쓰인 노말벡터는 Vector3.Normalize()한 벡터와 다르다. Normalize를 한 벡터는 방향만 가지고 있는 크기가 1인 벡터이다. 

## 4. Space

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/SplineMesh/Space.png){: .align-center}

일반적으로 유니티는 왼손좌표계다.

왼손좌표계란 위 사진과 같이 왼손으로 엄지를 제외한 나머지 손가락을 감을 때, 그 방향이 +인 방향이고, 손가락 세개를 각각 폈을 때, 엄지의 방향이 X의 +방향, 검지의 방향이 y의 +방향, 중지의 방향이 z의 +방향이다. (두 번 째 그림을 보고 방향이 이상하다고 생각할 수 있으나, 본인 기준으로 중지를 앞으로 하고 검지를 윗방향으로 하면 이해하기 쉽다.)



유니티와 같이 왼손좌표계를 따르는 그래픽스 라이브러리나 엔진에는 DirectX와 ZBrush가 있다. 반대로 오른손좌표계를 쓰는 것은 OpenGL이나 MAYA가 있다.

※ 간간히 같은 왼손좌표계이지만 y축이 위로 올라가느냐, z축이 위로 올라가느냐로 나뉜다.

유니티는 y축이 위로 올라가는 좌표계이고 언리얼은 z축이 위로 올라가는 좌표계이지만 둘 다 왼손 좌표계이다.





※ 추후에 더 설명을 자세하게 적을 예정.
