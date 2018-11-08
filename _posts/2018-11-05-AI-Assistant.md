---
layout: post
comments: true
title:  "[칼럼] AI 음성비서, 어디까지 왔을까?"
date:   2018-11-08 15:01:30
author: devsaka
categories:
  - AI
tags:
  - AI
  - 음성인식
  - 컬럼
cover:
---
## 음성을 이용하여 컴퓨터와 상호작용을 시도하다.
**음성**은 인간이 가진 가장 본질적인 커뮤니케이션이다.그래서 음성을 이용해 컴퓨터와 상호작용을 하는 것을 가장 이상적인 인터페이스로 여겼다. 1954년 IBM과 조지타운 대학이 공동으로 참여한 기계번역(Machine-translation) 기술 개발 프로젝트부터 시작해 많은 연구가 진행되었다.

하지만 방대한 음성데이터를 처리하기 위한 컴퓨터의 연산 능력 부족과 낮은 인식률로 인해 영화 "아이언 맨"에 나오는 음성 인식 비서 자비스와 같은 기술은 아직 멀리 있는 듯 했다. 2011년 애플에서 시리가 등장하기 전까지는 말이다.

## 최초의 상용화 AI 음성 비서, 시리(Siri)
2011년 10월 4일, 아이폰 4s 발표와 함께 시리(Siri)가 발표되었다. 그 당시만 해도 단순한 음성 인식 기능을 애플처럼 포장했다라고 저평가 받았지만, **AI가 뒷받침하는 음성 인식 개인비서라는 것이 밝혀지면서 주목을 받기 시작**했다. 그 이후에 2013년 안드로이드 4.4 Kitkat OS부터 Google Now 애플리케이션을 통해 음성검색 기능인 "OK Google" 서비스를 지원하기 시작하면서 본격적으로 일반인에게 음성 인식 기술이 빠르게 보급되기 시작했다. 하지만 이때까지는 "오늘의 날씨"와 같은 간단한 음성 인식 기능만 사용할 수 있었다.

## 스마트폰을 넘어서 집 안에 AI 비서가 생기다.
시리 이후 뚜렷한 진전이 없던 음성 비서 분야에서 "Always ready, connected, and fast. Just Ask" 라는 문구와 함께 2014년 11월 아마존에서 스마트 스피커 "에코"가 등장했다. 

<iframe width="639" height="310" src="https://www.youtube.com/embed/FQn6aFQwBQU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

"알렉사" 라는 별명을 가진 음성 인식 비서가 내장된 스마트 스피커였다. 시리처럼 날씨, 시간 뿐만 아니라 그 날의 주요 뉴스 브리핑, 스포츠 게임 결과, 심지어 홈 오토메이션(블루투스나 와이파이로 조절할 수 있는 물건들)이 되는 게 가능하도록 디자인 된 전등, 전원 스위치는 알렉사가 해결해줄 수 있었다. 잠자리에 누웠다가 전원을 끄기 위해 다시 일어나야 하는 불편함 대신, "불 꺼(turn the light off)" 한 마디로 해결할 수 있었다. 

또한 아마존은 자사 제품 중 "대시"처럼 에코로 쇼핑을 가능하게 했다. 디지털 음원 뿐만 아니라 다양한 실물 제품을 장바구니에 넣고 현재 주문 상태를 확인하고 주문할 수 있게 했다. 물론 제한 사항은 존재했지만 음성 인식 기능이 엄청나게 발전했다라고 느꼈다. 에코가 대 성공을 거둔 이후 글로벌 IT 시장을 주도하고 있는 메이저 기업들은 자체 AI 음성 비서 개발은 물론 이의 플랫폼화를 위해 보급 확대로 시장 선점을 도모하기 시작했다. SKT 누구, KT 기가지니 등 한국에서도 음성 인식 비서가 출시됐고 현재도 계속해서 발전하고 있는 중이다.

## AI 음성 비서가 직접 전화를 걸어 미용실을 예약했다.
2018년 5월 8일, 구글 I/O 개발자 컨퍼런스에서 **듀플렉스(Duplex)** 가 공개됐을 때, 경악을 금치 못했다. 여태껏 봐왔던 AI 비서와는 차원이 달랐다.
<iframe width="639" height="310" src="https://www.youtube.com/embed/bd1mEm2Fy08" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

Google Now에서 업그레이드 된 Google Assistant로 미용실 약속을 사용자가 잡아놓으면, Google Assistant가 미용실에 직접 전화를 걸어 미용사와 통화를 해 예약을 잡아주는 방식이었다. 더욱 놀라웠던 것은 대화 중 긍정을 뜻하는 '으흠' 이나 잠시 머뭇거리는 '음...' 등을 사용해 실제 사람처럼 말을 했다.<br>
![Change World preview][1]

[1]: https://1.bp.blogspot.com/-WdgRuOg6lwc/WvEZTDLYg_I/AAAAAAAACsM/QNLSl4Yid9wKij_2KNpCRiXjiyeptu9vgCLcBGAs/s640/rnn_big.png (preview)
이러한 듀플렉스의 핵심은 구글의 기계학습 AI 기술 **TFX(TesorFlow Extended)** 라고 한다. 익명 처리된 수십만 건의 온라인 예약 음성 녹음을 통해 반복 학습한 결과로 만들어졌다고 한다. 아직 테스트 버전으로 출시가 되었지만 조만간 제한된 영역에서 사용을 할 수 있을 것이라고 했다.

## 앞으로는 어떻게 AI 음성 비서가 발달하게 될까?
AI 비서는 우리 생활에서 스마트폰으로 날씨를 알려주던 기능부터 홈 오토메이션이 되는 스마트 스피커, 그리고 이젠 미용실이나 레스토랑까지 전화해서 예약을 해주는 수준까지 발달했다. 이제 AI 음성 비서는 스마트폰, 스피커를 넘어 가정용 기기나 자동차 등 다양한 디바이스 분야로 영역을 확대한다고 한다. 앞서 이야기했듯 "음성"을 이용하는 것은 인간과 컴퓨터의 상호작용에 가장 이상적인 인터페이스기 때문이다. 스마트폰의 등장으로 휴대전화의 패러다임이 바뀌었듯이 AI를 기반으로 한 음성 비서의 확산은 향후 대부분의 HW 기기 산업 발전 방향에 커다란 영향을 줄 것이다. 이제 우리는 냉장고와도 음성으로 대화를 해 필요한 재료를 주문할 수도 있을 것이고, 자동차에 음성으로 길을 묻는 세상이 도래할 것이다.

## 참고
- 음성인식 AI 비서 시장의 현황과 시사점. 최지혜, 이선희
- 플랫폼으로 진화하는 인공지능(AI) 음성비서. 조성선, 김용균
- [https://ai.googleblog.com/2018/05/duplex-ai-system-for-natural-conversation.html](https://ai.googleblog.com/2018/05/duplex-ai-system-for-natural-conversation.html)