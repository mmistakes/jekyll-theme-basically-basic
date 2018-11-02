---
layout: post
title:  "[Unity] Unable to convert classes into dex format"
date:   2018-10-29 21:02:30
author: devsaka
categories:
  - Unity
tags:
  - Unity
  - Develop
  - Android
  - MultiDex
image: /assets/images/Multidex/m1.PNG
comments: true
---

## 에러 내용
유니티(5.x버전)에서 안드로이드 빌드를 하다가 다음과 같은 에러가 발생했다.<br><br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/Multidex/m1.PNG){: .align-center}<br>
콘솔에서 확인해보니 다음과 같은 이유로 빌드에 실패했다고 뜬다.
```
"trouble writing output: Too many field references to fit in one dex file: 90410; max is 65536.
You may try using multi-dex. If multi-dex is enabled then the list of classes for the main dex list is too large."
```
하나의 dex 파일에 참조가 너무 많아서 생기는 버그였다.(최대 65536).이를 해결하기 위해서는 `multi-dex` 를 사용하라고 한다.<br><br>
원인을 찾아보니 한 프로젝트 안에 너무 많은 플러그인을 넣은 것이 문제였다. 필요없는 플러그인을 지워 길이를 맞추면 해결되는 문제다.<br><br>
하지만 이 프로젝트에서 뺄 수 있는 플러그인이 아무 것도 없기 때문에 multi-dex를 사용하는 방향으로 잡았다.

방법은 다음과 같다.

## 사전 준비
안드로이드 스튜디오(Android Studio)가 필요하다. 없으면 안드로이드 스튜디오를 다운로드한다.설치는 아래 링크에서 진행할 수 있다.<br>
[설치링크](https://developer.android.com/studio/index.html?hl=ko)

## 에러 해결 방법
1. File->Build Settings 클릭
2. 오른쪽 하단에 Build System에서 Gradle(New)로 선택, 바로 밑에 있는 Export Project에 체크를 한다.<br><br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/Multidex/m2.PNG){: .align-center}<br>
3. Export 버튼을 누른다
4. 안드로이드 스튜디오를 열어 'Open an existing Android Studio project' 클릭, 생성된 폴더를 선택해 프로젝트를 연다.<br><br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/Multidex/m3.PNG){: .align-center}<br>
5. 프로젝트가 켜지면, 왼쪽에 '1.Project' 를 누르고 Gradle Scripts/build.gradle을 클릭한다.
6. 이 부분에서 마지막에 gradle : 2.X.X를 최신버전으로 맞춰준다. (필자 작성 기준, 2.3.2 가 최신버전. 아마 다르게 적어도 나중에 최신버전으로 자동으로 컨버팅 되는 것 같다.)
```gradle
buildscript {
   repositories {
      jcenter()
   }

   dependencies {
      classpath 'com.android.tools.build:gradle:2.3.2'
   }
}
```
7. 바로 밑 dependencies 에 다음 줄을 추가한다.
```gradle
compile 'com.android.support:multidex:1.0.1'
```
8. android { 로 시작하는 부분으로 가서, defalutConfig 안에 다음 코드를 삽입한다.
```gradle
android {
   compileSdkVersion 25
   buildToolsVersion '27.0.1'

   defaultConfig {
      targetSdkVersion 25
      applicationId 'com.회사이름.프로젝트이름'

      multiDexEnabled true <- 이 부분만 추가하면 됨.
}
```
9. 8번 영역에서 android { } 구간 안에 다음 코드를 삽입한다.
```gradle
dexOptions {
   javaMaxHeapSize "4g"
}
```
10. 다시 왼쪽 1.Project로 가서 '프로젝트이름/manifests/AndroidManifest.xml'을 클릭한다.
11. application 태그 제일 끝에 다음 코드를 삽입한다. 
```xml
android:name="android.support.multidex.MultiDexApplication"
```
12. 바로 위에 Sync Now 버튼을 클릭<br><br>
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/Multidex/m4.PNG){: .align-center}<br>
13. 상단 메뉴에서 Build -> Generate Signed APK 클릭
14. 유니티에서 Player Settings/Publishing Settings 에서 쓰던 Keystore 등록하기(없으면 Create new 버튼을 눌러 새로 만들면 된다)
15. 패스워드 등 기본 정보 입력 후 finish 버튼을 누르면 빌드가 된다. 빌드파일은 보통 프로젝트 폴더 안에 있다.

## 후기
이렇게 하면 성공적으로 apk 파일을 뽑을 수 있다. 13~15 부분은 한번 등록해놓으면 다음부터는 패스워드만 입력하면 바로 빌드할 수 있다.<br><br>
하... 그래도 1번부터 12번까지 다시하는건 매번해도 귀찮다.
