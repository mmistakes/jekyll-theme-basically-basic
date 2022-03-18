# Welcome to Scalable Architecture Lab (SAL) at SKKU.

----

# 홈페이지 관리를 위한 가이드 매뉴얼

## 사용 언어 및 프레임워크

### [Jekyll](https://jekyllrb.com/)
  - Ruby 언어로 만들어진 Static-site generator
  - Github blog를 만들 때 많이 사용되는 웹페이지 제작 프레임워크
  - html, css, markdown 등을 지원
  - liquid라는 템플릿 언어를 통해 웹페이지를 위한 스크립트 제작 가능
  - 다양한 플러그인과 테마를 지원
    - 연구실 홈페이지는 [Basically Basic](https://github.com/mmistakes/jekyll-theme-basically-basic)이란 테마를 사용 중
      링크를 타고 들어가면, Basically basic 테마 사용을 위한 document가 상세히 기술되어 있음.

## 디렉토리 구조
```
BaseDirectory
├── Gemfile
├── jekyll-theme-basically-basic.gemspec  # 홈페이지에 사용되는 Jekyll-plugin dependecy
│ 
├── \_config.yml        # 홈페이지의 기본적인 설정을 위한 파일
├── index.html          # 메인 페이지
├── people.md           # People 페이지
├── publications.md     # Publications 페이지
├── research.md         # Research 페이지
├── resources.md        # Resources 페이지
│ 
├── assets/             # 이미지, 영상 등 웹페이지에 필요한 파일들이 보관되는 폴더
│   ├── favicon/        # favicon이 저장된 폴더
│   ├── images/         # 웹페이지에 필요한 이미지가 저장된 폴더
│   ├── javascripts/
│   ├── stylesheets/
│   └── templates/      # 포스팅을 위한 템플릿이 저장된 폴더. 사용 요령은 템플릿 내에 기재되어 있음
│       ├── news.md     # 뉴스를 위한 템플릿
│       └── pub.md      # 논문을 위하 템플릿
├── \_data/
│   └── theme.yml       # 테마 설정을 위한 yaml 파일. 여기서 색상 설정이 가능하다. 또, 좌측 사이드바의 네비게이션 페이지 설정도 가능하다
├── \_includes/         # 포함시키고 싶은 html 파일이 저장된 폴더. 여기 있는 html 파일은 liquid의 include 구문을 통해 사용 가능하다
├── \_layouts/          # 포스트의 front matter에서 설정 가능한 layout들이 저장된 폴더
├── \_sass/             # html의 class를 위한 css 파일들이 저장된 폴더. 시각적인 요소들은 여기서 정의된다.
├── \_posts/            # 포스팅들이 저장된 경로. 템플릿 폴더의 템플릿들을 사용해서 내용을 작성한다.
│   ├── news/
│   └── pub/
│ 
├── Rakefile            # Ruby에서 사용되는 일종의 Makefile
└── \_site              # HTML로 컴파일 된 웹페이지. 웹페이지는 실질적으로 이 폴더 내에서 작동한다.
```

## Build, test, and host

- Jekyll을 이용하기 위해선, Ruby, Bundle이 필요하다.

### 페이지 빌딩, 테스팅
- 아래 커맨드로 페이지 빌드 및 테스트 가능하다.
- http://localhost:4000 으로 로컬호스트를 통해 접속 가능
- 로컬호스트로 접속하면 빌드된 페이지를 미리 확인할 수 있다.
```
$ bundle exec jekyll serve
```

### 페이지 호스팅
- Github 레포지토리에 push하게 되면 github action에서 자동으로 빌드 후, 페이지 호스팅이 된다.
```
$ git add . 
$ git commit -m "Changes updated"
$ git push origin master
```


