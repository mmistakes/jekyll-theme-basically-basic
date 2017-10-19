# coding: utf-8

Gem::Specification.new do |spec|
  spec.name                    = "jekyll-theme-basically-basic"
  spec.version                 = "1.1.3"
  spec.authors                 = ["Michael Rose"]

  spec.summary                 = %q{Your new Jekyll default theme.}
  spec.homepage                = "https://github.com/mmistakes/jekyll-theme-basically-basic"
  spec.license                 = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files                   = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_(includes|layouts|sass)/|(LICENSE|README|CHANGELOG)((\.(txt|md|markdown)|$)))}i)
  end

  spec.add_runtime_dependency "jekyll", "~> 3.3"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.8"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.1"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.0"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end
