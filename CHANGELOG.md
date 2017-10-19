# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.1.3] - 2017-10-19

### Fixed
- Fixed `{nil, "picture"=>nil"}` in `_layouts/about.html` when author image isn't set. [#34](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/34)

## [1.1.2] - 2017-09-14

### Fixed
- Adjusted `/_sass/_print.scss` to reduce blank pages when printing in Chrome. [#29](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/29)
- Fixed sidebar visibility bug in Firefox and Safari by adding toggling `visibility: hidden`. [#31](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/31) 

## [1.1.1] - 2017-09-06
### Changed
- Change `gems` key in `_config.yml` to `plugins`. [#23](https://github.com/mmistakes/jekyll-theme-basically-basic/pull/23)
- Fixed Liquid syntax error: "Expected id but found end_of_string_in `cv.skills.`" in `/cv/skills.html` include.

## [1.1.0] - 2017-03-30
### Added
- Improved installation documentation. [#8](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/8)
- Google Analytics tracking ID, Disqus comments, to `/docs` demo site.

### Changed
- Change source order of `.sidebar` and `.canvas` so menu items can easily be "tabbed" to. [#10](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/10)
- Refactor sidebar off-canvas menu and improve animation. [#9](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/9) [#15](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/15)
- Removed tinted background from `<th>` elements.
- Permalink structure of `/docs` demo site.

### Fixed
- `body` height and `.wrapper` box shadow. [#13](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/13)
- Unclickable main content links in Internet Explorer 10. [#9](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/9)

## [1.0.1] - 2017-03-23
### Added
- Responsive embed helper classes for videos. [#2](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/2)
- Print styles for improved readability of printed pages. [#4](https://github.com/mmistakes/jekyll-theme-basically-basic/pull/4)
- Icon list to README.

## [1.0.0] - 2017-03-20
