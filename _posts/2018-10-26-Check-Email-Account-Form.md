---
layout: post
title:  "[Unity, LinQ] 입력한 텍스트가 이메일 형식인지 체크하는 방법"
date:   2018-10-26 13:29:30
author: devsaka
categories:
  - Unity
tags:
  - Unity
  - Develop
  - Linq
cover:
---

개발하던 앱에 로그인과 회원가입 기능을 넣어야했다.

유저가 실제로 사용하는 이메일이어야하며, 이메일 형식이어야 나중에 마케팅에 쓸 수 있다고 부탁을 했다.

인증 형식을 어떻게 해야할 지가 참 고민이었는데 구글에서 해답을 찾았다.

※ input_email.text -> Unity uGui에 있는 InputFiled컴포넌트를 받아온 것이다. 이것 말고 다른 원하는 자료형을 받아서 작업할 수 있다.

```c#
using System.Globalization;
using System.Text.RegularExpressions;
 
private bool invalidEmailType = false;       // 이메일 포맷이 올바른지 체크
private bool isValidFormat = false;          // 올바른 형식인지 아닌지 체크
 
void Update()
{
    if (CheckEmailAddress())
    {
        // 이메일 형식이 맞을 때 여기에 코드 입력
    }
}
  
/// <summary>
/// 올바른 이메일인지 체크.
/// </summary>
private bool CheckEmailAddress()
{
    if (string.IsNullOrEmpty(input_email.text)) isValidFormat = false;
 
    input_email.text = Regex.Replace(input_email.text, @"(@)(.+)$", this.DomainMapper, RegexOptions.None);
 	if (invalidEmailType) isValidFormat = false;
 
    // true 로 반환할 시, 올바른 이메일 포맷임.
    isValidFormat = Regex.IsMatch(input_email.text,
                  @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
                  @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$",
                  RegexOptions.IgnoreCase);
    return isValidFormat;
}
 
/// <summary>
/// 도메인으로 변경해줌.
/// </summary>
/// <param name="match"></param>
/// <returns></returns>
private string DomainMapper(Match match)
{
    // IdnMapping class with default property values.
    IdnMapping idn = new IdnMapping();
 
    string domainName = match.Groups[2].Value;
    try
    {
        domainName = idn.GetAscii(domainName);
    }
    catch (ArgumentException)
    {
        invalidEmailType = true;
    }
        return match.Groups[1].Value + domainName;
}
```
