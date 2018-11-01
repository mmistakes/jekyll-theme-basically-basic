---
layout: post
title:  "[iOS] 스위프트에서 화면 전환하는 법"
date:   2018-10-29 19:25:59
author: devsaka
categories:
  - Swift
tags:
  - Swift
  - Develop
  - Segue
  - 화면 전환
cover:
comments: true
---

Swift를 겉핥기 식으로 공부한 뒤, iOS 프로젝트를 진행하는 중이었다.<br>
개발 중 메인으로 쓰여지는 홈 화면에서 A 뷰 컨트롤러로 갔다가 다시 메인으로 오니 Popup Alert창이 떠야하는 데 뜨질 않는 버그가 발생했다.<br>

코드 상에서 잘못된 부분이 없길래 A 뷰 컨트롤러로 가는 코드만 지웠더니 알람창은 제대로 뜨니 뷰 컨트롤러 간의 이동이 잘못된 것을 감지하고 애꿎은 Show, Push, Modal만 바꿨다.<br>
도저히 안되겠어서 검색했더니 iOS에서 화면 전환 개념은 4가지 정도 되는 것 같다.

참조링크 : [iOS 화면 전환 - 조민재](https://medium.com/@mingdaejo/ios-%ED%99%94%EB%A9%B4-%EC%A0%84%ED%99%98-b979188a1a82)

여기서 나는 다음 코드와 같이 4번인 객체 세그웨이를 사용해서 화면을 전환하는 방식을 사용했는데(스토리보드에서 시각적으로도 보기 편했다.)
```swift
performSegue(withIdentifier: "Home", sender: nil)
```
이 경우의 문제점은 뷰 컨트롤러가 바뀔 때마다 새로운 인스턴스를 생성해서 최상층으로 올라온다는 점이다. 이게 뭐가 문제냐면 Main에서 A를 갔다가 A에서 다시 Main을 가니 Main-A-Main으로 Main이 두 개 돌아간다는 것이었다. 

그래서 다시 메인으로 돌아와야하는 뷰 컨트롤러에는 다음과 같은 코드로 수정했다.
예를 들어 A->B->A 로 넘어가야 하는 구조라고 가정하자.<br><br>
먼저 A.Swift의 코드를 보자.
```swift
// B 컨트롤러 뷰를 가져온다. 
// Storyboard에서 뷰 컨트롤러에서 identifier가 미리 설정이 되어있어야 한다. 
let webPage = self.storyboard?.instantiateViewController(withIdentifier: "WebPageView")
// B 컨트롤러 뷰로 넘어간다.
self.present(webPage!, animated: true, completion: nil)
```

그 다음 B.Swift에서 버튼 클릭 등 이전 뷰로 돌아가야할 때 다음과 같이 작성한다.
```swift
// B 컨트롤러를 지운다.
self.dismiss(animated: true, completion: nil)
```

원리는 A에서 B로 올라갈 때 A 위에 B가 스택처럼 쌓이는데 dismiss를 해주면서 B를 지워주는 것이다. 그러면 깔끔하게 A만 남는다.<br><br>
역시 삽질을 해야 잡지식이 는다.


