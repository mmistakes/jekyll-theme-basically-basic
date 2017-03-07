# WIP Basically Basic Jekyll Theme

Basically Basic is a [Jekyll theme](https://jekyllrb.com/docs/themes/) meant as a substitute for the default `jekyll new` theme --- [Minima](https://github.com/jekyll/minima). Conventions and features found in Minima are fully supported by **Basically Basic**, with a few enhancements here and there.

## Table of Contents

## Installation

1. Install the theme as a Ruby Gem by adding it to your `Gemfile` like so:

   ```ruby
   gem "jekyll-theme-basically-basic", :git => "https://github.com/mmistakes/jekyll-theme-basically-basic.git"
   ```

2. Fetch and update your bundled gems by running the following [Bundler](http://bundler.io/) command:
   
   ```bash
   bundle
   ```

3. Set the `theme` in your project's Jekyll configuration, `_config.yml`:

   ```yaml
   theme: jekyll-theme-basically-basic
   ```

## Configuration

Configuration of site-wide elements (`title`, `description`, `author`, etc.) happens in your project's `_config.yml`. See the [example configuration](/example/_config.yml) for reference.

### Skin

This theme comes in six different skins (color variations). To change skins edit your project's `_config.yml` to one of the following:

| `theme_skin: default` | `theme_skin: night` | `theme_skin: plum`  |
| `theme_skin: sea`     | `theme_skin: soft`  | `theme_skin: steel` |

### Navigation

By default all internal pages with a `title` will be added to the "off-canvas" menu. For more granular control and sorting of these menu links:

1. Create a custom list to override the default setting by adding a `navigation_pages` array to your `_config.yml` file. 

2. Add raw page paths in the order you'd like:

   ```yaml
   navigation_pages:
     - about.md
     - cv.md
   ```

Each menu link's title and URL will be populated based on their `title` and `permalink` respectively.

### Pagination

Break up the main listing of posts into smaller lists and display them over multiple pages by [enabling pagination](http://jekyllrb.com/docs/pagination/).

1. Include the `jekyll-paginate` plugin in your `Gemfile`.

   ```ruby
   group :jekyll_plugins do
     gem "jekyll-paginate"
   end
   ```

2. Add `jekyll-paginate` to `gems` array in your `_config.yml` file and the following pagination settings:

   ```yaml
   paginate: 5  # amount of posts to show per page
   paginate_path: /page:num/
   ```

3. Create `index.html` (or rename `index.md`) in the root of your project and add `layout: home` `paginate: true` to its YAML Front Matter.

### Comments (via Disqus)

Optionally, if you have a [Disqus](https://disqus.com/) account, you can show a comments section below each post.

To enable Disqus comments, add your [Disqus shortname](https://help.disqus.com/customer/portal/articles/466208) to your project's `_config.yml` file:

```yaml
  disqus:
    shortname: my_disqus_shortname
```

Comments are enabled by default and will only appear in production when built with the following [environment value](http://jekyllrb.com/docs/configuration/#specifying-a-jekyll-environment-at-build-time): `JEKYLL_ENV=production`

If you don't want to display comments for a particular post you can disable them by adding `comments: false` to that post's YAML Front Matter.

### Google Analytics

To enable Google Analytics, add your [tracking ID](https://support.google.com/analytics/answer/1032385) to `_config.yml` like so:

```yaml
  google_analytics: UA-NNNNNNNN-N
```

Similar to comments, the Google Analytics tracking script will only appear in production when using the following environment value: `JEKYLL_ENV=production`.

## Layouts

This theme provides the following layouts, which you can use by setting the `layout` [Front Matter](https://jekyllrb.com/docs/frontmatter/) on each page, like so:

```yaml
---
layout: name
---
```

### `layout: default`

### `layout: post`

### `layout: page`

### `layout: home`

### `layout: about`

### `layout: cv`

## Customization

The default structure, style, and scripts of this theme can be overridden and customized in the following two ways.

### Overriding Includes and Layouts

Theme defaults can be [overridden](http://jekyllrb.com/docs/themes/#overriding-theme-defaults) by placing a file with the same name into your project's `_includes` or `_layouts` directory. For instance:

- To specify a custom style path or meta data to the [`_includes/head.html `](_includes/head.html) file, create an `_includes` directory in your project, copy `_includes/head.html` from Basically
Basic's gem folder to `<your_project>/_includes` and start editing that file.

**ProTip:** to locate the theme's files on your computer run `bundle show jekyll-theme-basically-basic`. This returns the location of the gem-based theme files.

### Customizing Sass (SCSS)

To override the default [Sass](http://sass-lang.com/guide) (located in theme's `_sass` directory), do one of the following:

1. Copy directly from the Basically Basic gem

  - Go to your local Basically Basic gem installation directory (run `bundle show jekyll-theme-basically-basic` to get the path to it).
  - Copy the contents of `/assets/stylesheets/main.scss` from there to `<your_project>`.
  - Customize want you want inside `<your_project>/assets/stylesheets/main.scss`.

2. Copy from this repo.

  - Copy the contents of [assets/stylesheets/main.scss](assets/stylesheets/main.scss) to `<your_project>`.
  - Customize want you want inside `<your_project/assets/stylesheets/main.scss`.

**Note:** To make more extensive changes and customize the Sass partials bundled in the gem. You will need to copy the complete contents the `_sass` directory to `<your_project>` due to the way Jekyll currently reads those files.

To make basic tweaks to theme's style Sass variables can be overridden by adding to `<your_project>/assets/stylesheets/main.scss`. For instance, to change the accent color used throughout the theme add:

```scss
$accent-color: red;
```

Before any `@import` lines.

### Customizing JavaScript

To override the default JavaScript bundled in the theme, do one of the following:

1. Copy directly from the Basically Basic gem

  - Go to your local Basically Basic gem installation directory (run `bundle show jekyll-theme-basically-basic` to get the path to it).
  - Copy the contents of `/assets/javascripts/main.js` from there to `<your_project>`.
  - Customize want you want inside `<your_project>/assets/javascripts/main.js`.

2. Copy from this repo.

  - Copy the contents of [assets/javascripts/main.js](assets/javascripts/main.js) to `<your_project>`.
  - Customize want you want inside `<your_project>/assets/javascripts/main.js`.

### Customizing Sidebar Content

---

## Development

To set up your environment to develop this theme:

1. Clone this repo
2. `cd` into `/example` and run `bundle install`.

To test the theme the locally as you make changes to it:

1. `cd` into the root folder of the repo (e.g. `jekyll-theme-basically-basic`).
2. Run `bundle exec rake preview` and open your browser  to `http://localhost:4000/example/`. 

This starts a Jekyll server using the theme's files and contents of the `example/` directory. As modifications are made, refresh your browser to see any changes.

## Contributing

Found a typo in the documentation? Interested in adding a feature or 
[fixing a bug][issues]? Then by all means [submit an issue][new-issue] or take a
stab at submitting a [pull request][using-pull-requests]. If this is your first 
pull request, it may be helpful to read up on the [GitHub Flow][github-flow].

[issues]: https://github.com/mmistakes/jekyll-theme-basically-basic/issues
[new-issue]: https://github.com/mmistakes/jekyll-theme-basically-basic/issues/new
[using-pull-requests]: https://help.github.com/articles/using-pull-requests/
[github-flow]: https://guides.github.com/introduction/flow/

### Pull Requests

When submitting a pull request:

1. Clone the repo.
2. Create a branch off of `develop` and give it a meaningful name (e.g.
   `my-awesome-new-feature`) and describe the feature or fix.
3. Open a pull request on GitHub.

Theme documentation and sample pages can be found in the [`/docs`](docs) folder 
if you'd like to tackle any "low-hanging fruit" like fixing typos, bad grammar, etc.

---

## Credits

### Creator

**Michael Rose**

- <https://mademistakes.com>
- <https://twitter.com/mmistakes>
- <https://github.com/mmistakes>

### Icons + Demo Images:

- [Simple Icons](https://simpleicons.org/)
- [Noun Project](https://thenounproject.com)
- [Unsplash](https://unsplash.com/)

### Other:

- [Jekyll](http://jekyllrb.com/)
- [Susy](http://susy.oddbird.net/)
- [Breakpoint](http://breakpoint-sass.com/)

---

## License

The MIT License (MIT)

Copyright (c) 2017 Michael Rose

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
