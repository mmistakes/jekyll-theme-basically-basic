---
layout: post
title:  "[iOS] 비콘이 간헐적으로 통신이 끊길 때 해결법"
date:   2018-11-02 13:45:59
author: devsaka
categories:
  - Swift
tags:
  - Swift
  - Develop
  - iBeacon
  - iOS
image:
comments: true
---
앞서 개발하고 있던 비콘 프로젝트에서 간간히 비콘과의 연결이 끊어졌다가 다시 잡히는 현상이 발생했다.<br>
검색해보니 altBeacon이고 iBeacon이고 같은 증상이 나타나는 것 같다.<br><br>
회사 내부에서 회의하고 내린 결론은 다른 앱이 백그라운드에서 실행되거나, 다른 앱을 사용하고 있을 때 콜백이 늦게 돌아서 그 사이에 신호를 못잡으면 바로 비콘과의 연결이 끊어졌다고 체크하는 것이 문제였다.<br><br>
그래서 간단하게 비콘이 없다고 n 번 정도 체크가 되면 그 때 비콘과의 연결이 끊어졌다고 체크하는 기능을 만들어주기로 했다.<br>

```swift
var lostCount : Int = 0;    // 체크를 도와줄 변수

func locationManager(_ manager: CLLocationManager, didRangeBeacons beacons: [CLBeacon], in region: CLBeaconRegion) {
    if beacons.count > 0 {
        lostCount = 0;
        let nearestBeacon = beacons.first!
        switch nearestBeacon.proximity {
        case .immediate:
               break
        case .near:
            break               
        case .far:
            break            
        case .unknown:
            break
        }
    }
    else
    {
        lostCount += 1
        if (lostCount >= 3)
        {
            // 3 번 연속으로 비콘이 없다고 판단했을 때, 이 곳에서 비콘이 없다고 체크해줌.
        }
    }
}
```