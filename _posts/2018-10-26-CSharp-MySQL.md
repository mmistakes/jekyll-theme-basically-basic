---
layout: post
title:  "[C#, MySQL] C#에서 MySQL 사용하기"
date:   2018-10-26 14:59:30
author: devsaka
categories:
  - Develop
tags:
  - C#
  - Unity
  - Develop
  - MySQL
  - Database
cover:
---

C# Native에서 MySQL을 사용하는 것은 Postgresql보다 세팅도 간단하고 훨씬 편했다. 


## 1. 개발환경 세팅하기.

나는 Visual Studio 2017 Community에서 C#으로 프로젝트를 진행하기 때문에 

> [MySQL Download Connector](https://dev.mysql.com/downloads/connector/net/)

에서 'Select Operating System'을 '.Net & Mono' 용으로 받았다(Mono도 같이 있으니까 Unity에서도 쓰라고 합쳐놓은 듯 하다.)

다운로드 버튼을 누르면 밑에 'No thanks, just start my download.' 가 있으니 굳이 회원가입을 하지 않아도 된다.



드라이버를 설치하고 Visual Studio로 돌아와 솔루션 탐색기 내에 
> 참조 오른쪽 클릭 -> 참조 추가 -> 찾아보기 -> MySql.Data.dll 파일 참조
를 해주면 세팅은 끝이다. 만약 유니티 작업환경이라면 'Mysql.Data.dll' 파일을 Assets/Plugins 폴더에 넣어주기만 하면 된다.


## 2. MySQL Database가 있는 곳과 연결하기.

상당히 간단하다. 세 줄이면 연결할 수 있다.
```c#
string strConn = string.Format("server={0};uid={1};pwd={2};database={3};charset=utf8 ;", 
                               ipAddress or DNS address, db_id, db_pw, db_name);
MySqlConnection conn = new MySqlConnection(strConn);
conn.Open();
...
conn.Close(); // 사용이 끝나면 닫아주자.
```
첫 줄에서 디비에 대한 정보를 작성하고 두 번 째 줄에서 연결해준다. 마지막에 `charset=uft8` 은 한글로 데이터를 넣었을 때 깨지지 않게 하기 위함이다.

## 3. 리턴 값이 필요없는 명령문 작성.

리턴값이 필요없는 명령어에는 크게 `INSERT`, `UPDATE`, `DELETE` 가 있다. 뭐 잘 작동했는 지에 대한 명령어를 받고 싶다면 4번처럼 작업하면 된다.

```c#
MySqlCommand command = new MySqlCommand(quary, conn);
command.ExecuteNonQuery();
```

quary 대신에 명령어 

```yaml
INSERT INTO tableName VALUES (val1, val2, ... ))
```

 넣어주면 끝이다.

## 4. 리턴 값이 필요한 명령문 작성.

"데이터를 읽어온다" 라고 이해하면 좀 더 편하겠다. 쉽게 말해서 `SELECT` 문 처럼 데이터를 읽어와야할 때 사용한다.

```c#
MySqlCommand command = new MySqlCommand(quary, conn);
MySqlDataReader rdr = command.ExecuteReader();

string temp = string.Empty;
if (rdr == null) temp = "No return";
else
{
  while (rdr.Read())
  {
    for (int i = 0; i < rdr.FieldCount; i++)
    {
      if (i != rdr.FieldCount - 1)
          temp += rdr[i] + ";";    // parser 넣어주기
      else if (i == rdr.FieldCount - 1)
          temp += rdr[i] + "\n";
    }
  }
}
```

나는 이렇게 많이 쓰는 편이다. parser로 붙여서 클라이언트로 보내주고, Split('parser')로 잘라서 쓰는 편이 더 편하기 때문이다.
마찬가지로 quary 대신에 명령어로

```yaml
SELECT * FROM tableName
```

등을 넣어주면 된다.

## 5. Transaction 사용하기.

트랜잭션은 여러가지 일을 한번에 처리하기 위해서 사용한다. 예를 들어 유저 이름으로 된 테이블을 새로 생성하고, 전체 유저 테이블에 신규 유저의 정보를 추가한다라던가, 테이블에 데이터를 넣고, 그 테이블에 데이터가 잘 들어갔는지 확인하기 위해 `SELECT` 문을 사용한다든지..

Postgresql같은 경우에는 그냥 한 쿼리문 안에 트랜잭션 문을 작성하면 됐는데, MySQL은 조금 다른 편이다.

```c#
MySqlCommand command = conn.CreateCommand();
MySqlTransaction myTrans = conn.BeginTransaction(); // 트랜잭션 시작

command.Connection = conn;
command.Transaction = myTrans;

command.CommandText = (첫 쿼리문, 유저 이름으로 된 테이블 생성);
command.ExecuteNonQuery();

command.CommandText = (두 번 째 쿼리문, 전체 유저 테이블에 신규 유저 정보 저장);
command.ExecuteNonQuery();

myTrans.Commit(); // 트랜잭션 끝
```

간단간단하다.
