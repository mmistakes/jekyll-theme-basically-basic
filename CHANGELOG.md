# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

### Changed
- New installation and upgrade instructions.

### Fixed
- Fix `border-bottom` for Gist line numbers.

## [1.2.0] - 2018-01-05

### Added
- Use [jekyll-remote-theme](https://github.com/benbalter/jekyll-remote-theme) for demo site.

### Changed
- Update GitHub Pages compatible installation instructions to include jekyll-remote-theme method.
- Update `site.gems` references to `site.plugins`. [#39](https://github.com/mmistakes/jekyll-theme-basically-basic/pull/39)
- Update license and copyright.
- Improve syntax highlighting styles and colors.

### Fixed
- Fix primary navigation skip link to use correct anchor ID. [#41](https://github.com/mmistakes/jekyll-theme-basically-basic/pull/41)
- Fix Susy deprecation warnings by updating to version 3. [#21](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/21)

## [1.1.3] - 2017-10-19

### Fixed
- Fix `{nil, "picture"=>nil"}` in `_layouts/about.html` when author image isn't set. [#34](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/34)

## [1.1.2] - 2017-09-14

### Fixed
- Adjust `/_sass/_print.scss` to reduce blank pages when printing in Chrome. [#29](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/29)
- Fix sidebar visibility bug in Firefox and Safari by adding toggling `visibility: hidden`. [#31](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/31) 

## [1.1.1] - 2017-09-06

### Changed
- Change `gems` key in `_config.yml` to `plugins`. [#23](https://github.com/mmistakes/jekyll-theme-basically-basic/pull/23)

### Fixed
- Fix Liquid syntax error: "Expected id but found end_of_string_in `cv.skills.`" in `/cv/skills.html` include.

## [1.1.0] - 2017-03-30

### Added
- Improve installation documentation. [#8](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/8)
- Add Google Analytics tracking ID, Disqus comments, to `/docs` demo site.

### Changed
- Change source order of `.sidebar` and `.canvas` so menu items can easily be "tabbed" to. [#10](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/10)
- Refactor sidebar off-canvas menu and improve animation. [#9](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/9) [#15](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/15)
- Remove tinted background from `<th>` elements.
- Update permalink structure of `/docs` demo site.

### Fixed
- Fix `body` height and `.wrapper` box shadow. [#13](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/13)
- Fix unclickable main content links in Internet Explorer 10. [#9](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/9)

## [1.0.1] - 2017-03-23

### Added
- New responsive embed helper classes for videos. [#2](https://github.com/mmistakes/jekyll-theme-basically-basic/issues/2)
- New print styles for improved readability of printed pages. [#4](https://github.com/mmistakes/jekyll-theme-basically-basic/pull/4)
- Icon list to README.

## [1.0.0] - 2017-03-20
