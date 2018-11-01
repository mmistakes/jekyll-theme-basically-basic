---
layout: post
title:  "[iOS] Swift를 이용해 비콘을 연동해보자"
date:   2018-10-29 19:53:59
author: devsaka
categories:
  - Swift
tags:
  - Swift
  - Develop
  - iBeacon
  - iOS
cover:
comments: true
---

## 1. 시작하면서
회사에서 Swift와 비콘을 연동해 iOS Native 앱을 만드는 프로젝트를 진행하고 있다. 생판 배워본 적도 없는 Swift를 공부하고 구글링을 하면서 하나하나 만들어가는 중인데, 그 중에서 아이폰과 비콘을 연동하는 방법에 대해서 정리를 하기 위해 작성한다.

코드와 사전 지식은 다음 링크를 참고했다.<br>
참조링크 : [[ios] iBeacon - basic, 이동건의 이유있는 코드](http://baked-corn.tistory.com/121)<br><br>

## 2. 사전 지식
- 비콘이란 근거리 무선 통신 기술을 바탕으로 신호를 발산하는 소형 장치를 일컫는 말이다.<br><br>
- NFC의 경우에는 상당히 근접한 거리만 가능, 비콘은 블루투스 페어링 과정을 거쳐야 한다. <br><br>
- 비콘을 탐지하는 방법에는 `Monitoring`과 `Ranging`이 있다. 쉽게 이야기하면 Monitoring(모니터링)은 범위 내에 비콘이 있다/없다 로만 판별하며 Ranging(레인징)은 범위 내에 있을 경우, 스마트폰과 비콘 사이의 거리가 몇 m인지 실시간으로 체크해준다.(여기서 몇 m라고 하는 이유는 비콘마다 설정값이 다르지만 최대 50m까지 읽을 수 있다.)<br><br>
- GPS와 비콘의 차이는 GPS의 경우 실외에서는 거리의 차이에 상관없이 위치 탐색이 가능하나 거리 오차가 있고, 실내에서 사용이 불가능한 반면 비콘의 경우 거리는 상대적으로 짧으나 실내에서도 사용이 가능하다. 또한 전력 소모도 적다<br><br>
- 비콘은 신호를 보낼 수만 있고 받을 수는 없다.

## 3. 사전 준비
- 안드로이드와 달리 아이폰은 오로지 `iBeacon`만 읽을 수 있다. 먼저 안드로이드로 프로젝트를 진행하던 사원은 `altBeacon`, `iBeacon`등 상관없이 읽을 수 있는 듯 했지만, 아이폰은 전혀 그러지 못했다. 오히려 애플다웠다.<br><br>
- 이 뿐만이 아니다. 비콘 고유의 아이디라고 할 수 있는` uuid조차 앱 내부에서 고정으로 설정`해줘야 그 uuid를 가지고 있는 비콘만 읽을 수 있었다. 덕분에 major와 minor로 요리조리 암호화 복호화를 해야만 했다. <br><br>
- 소스코드 외적으로도 설정해줘야할 것이 많았다. 우선 위치 접근 허용을 `항상 허용`으로 해야 백그라운드에서도 정상적으로 앱이 작동한다(백그라운드에서 돌리지 않을 것이면 앱을 사용할 때만 허용해도 된다.) 개발 후에는 설정에서 개발한 앱에 들어가 위치 접근 허용을 끄면 된다. <br><br>
- 다음으로는 info.plist에서 다음과 같이 작성해준다. 둘 다 작성해줘야 한다.

```xml
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
    <string>위치 접근 항상 허용</string>
<key>NSLocationWhenInUseUsageDescription</key>
    <string>앱을 사용할 때만 허용</string>
```

- 또한 Project navigator->app target->Capabilities->Background Modes에서 `Location updates`을 체크해줘야한다.<br><br>
- 블루투스 또한 항상 켜져있어야 한다.

## 4. 코드 작성
iBeacon을 쓰기 위해서 Swift에서 `CoreLocation`을 import해줘야 한다.
```swift
import CoreLocation
```
그리고 델리게이트를 작성해줘야 정상적으로 작동하기 때문에 클래스에 다음과 같이 `CLLocationManagerDelegate`를 추가한다.<br>
```swift
class Home: UIViewController, CLLocationManagerDelegate {

}
```
다음 CLLocationManager형인 locationManager를 생성해주고, 델리게이트를 넣어준 후 위치권한과 위치 업데이트를 시작한다.
```swift
var locationManager : CLLocationManager!

override func viewDidLoad() {
    super.viewDidLoad()
    locationManager = CLLocationManager.init()              // locationManager 초기화.
    locationManager.delegate = self                         // 델리게이트 넣어줌.
    locationManager.requestAlwaysAuthorization()            // 위치 권한 받아옴.

    locationManager.startUpdatingLocation()                 // 위치 업데이트 시작
    locationManager.allowsBackgroundLocationUpdates = true  // 백그라운드에서도 위치를 체크할 것인지에 대한 여부. 필요없으면 false로 처리하자.
    locationManager.pausesLocationUpdatesAutomatically = false  // 이걸 써줘야 백그라운드에서 멈추지 않고 돈다
}
``` 
이렇게 작성하면 델리게이트가 작동한다.
```swift
// 위치 서비스에 대한 권한이 받아들여지면 MonitorBeacons() 함수 호출
func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
    if status == .authorizedAlways {
        monitorBeacons()
    }
}

// Monitoring 진행이 가능한 상태면 Monitoring 진행
func monitorBeacons(){
    if CLLocationManager.isMonitoringAvailable(for: CLBeaconRegion.self) {
        // 디바이스가 이미 영역 안에 있거나 앱이 실행되고 있지 않은 상황에서도 영역 내부 안에 들어오면 백그라운드에서 앱을 실행시켜
        // 헤당 노티피케이션을 받을 수 있게 함
        getBeaconRegion().notifyEntryStateOnDisplay = true
        // 영역 안에 들어온 순간이나 나간 순간에 해당 노티피케이션을 받을 수 있게 함
        getBeaconRegion().notifyOnExit = true
        getBeaconRegion().notifyOnEntry = true
        locationManager.startMonitoring(for: getBeaconRegion())
    }else{
        print("CLLocation Monitoring is unavailable")
    }
}

// 모니터링이 실행된 후 영역의 판단이 이루어지는 순간에 이 메소드가 실행
func locationManager(_ manager: CLLocationManager, didDetermineState state: CLRegionState, for region: CLRegion) {
    if state == .inside {        // 영역 안에 들어온 순간
        locationManager.startRangingBeacons(in: getBeaconRegion())
    }else if state == .outside { // 영역 밖에 나간 순간
        locationManager.stopRangingBeacons(in: getBeaconRegion())
    }else if state == .unknown {
        print("Now unknown of Region")
    }
}
func locationManager(_ manager: CLLocationManager, didRangeBeacons beacons: [CLBeacon], in region: CLBeaconRegion) {
    // 연결할 수 있는 비콘이 있는 경우
    if beacons.count > 0 {
        let nearestBeacon = beacons.first!  // 가장 가까이 있는 비콘을 내 비콘으로 잡자.
        // 거리에 맞게 원하는 코드를 작성하면 끝
        switch nearestBeacon.proximity {
        case .immediate:
            break
                
        case .near:
            break
                
        case .far:
            break
                
        case .unknown:
            break
        } else
        {
            // 연결할 수 있는 비콘이 없는 경우
        }
    }
}
```
또한 비콘이 범위내에 있는지 없는지 체크해주는(모니터링 해주는) 함수도 있다.
```swift
func locationManager(_ manager: CLLocationManager, didEnterRegion region: CLRegion) {
    print("비콘이 범위 내에 있음")
}
    
func locationManager(_ manager: CLLocationManager, didExitRegion region: CLRegion) {
    print("비콘이 범위 밖을 벗어남")
}
```

## 5. 마무리하면서
비콘을 쓰기 위해 구글링을 여럿했지만 최신 문서가 많이 없기 때문에 조금 힘들었다. 이 글을 보고 좀 더 편하게 개발을 할 수 있었으면 좋겠다.
