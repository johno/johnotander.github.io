---
layout: post
title: Open a Bundled Gem in Sublime Text
summary: Often times when I'm debugging, I find it very valuable to be able to quickly open up a gem that I'm using and read the source. Now it's just a simple command.
category: Zsh
---

Bundler provides a wonderful command to find the location of a bundled gem. For example, if I wanted to see the location of the gem `rspec`, I could do the following:

```bash
$ bundle show rspec
# => /Users/johnotander/.rvm/gems/ruby-2.1.1/gems/rspec-2.14.1
```

However, I wanted to make it just as simple to open the gem in Sublime Text. So I wrote the following bash function:

```bash
function gs () {
  st $( bundle show $1 )
}
```

This function can be placed in your Zsh config, `.zshrc`.

Just like that, I can now open up the source with:

```bash
$ gs rspec
```

Hooray.

### Note

You can use the `$ bundle open rspec` command which uses your `$EDITOR` environment variable, but it will be deprecating in future versions of bundler.

<blockquote class="twitter-tweet" lang="en"><p>&quot;bundle open &lt;gem_name&gt;&quot; is a great, easy way to learn about the libraries and frameworks you&#39;re using. Read the source!</p>&mdash; DHH (@dhh) <a href="https://twitter.com/dhh/statuses/440843559017906176">March 4, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

