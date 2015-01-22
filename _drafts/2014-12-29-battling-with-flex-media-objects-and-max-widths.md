---
layout: post
title: Battling with the Flex Media Object and Max Widths
summary: While working on a project, I encountered some strange behavior using flex objects in tandem with images using max-width.
category: css
---

While working on a project, I encountered some strange behavior using flex objects in tandem
with images using max-width. Unfortunately, it was one of those scenarios where there was a
lot going on in the page, so tracking down this discrepancy became rather difficult.

It was also one of those bugs that only reared its ugly head on one browser. This time
it was Firefox.

I was leveraging `display: flex;` in a media object which was used to wrap post content
with an icon along the left. Everything work perfectly with a large array of sample content,
including images, asides, pre blocks, etc.

After some debugging, I was able to narrow it down to a pesky image that was _extremely_
large. Since this project didn't have control over images that might be added, I had a CSS
declaration that restricted all elements to `max-width: 100%;`.

The simplified CSS:

{% higlight css %}
.media-object {
  display: flex;
  align-items: flex-start;
}

.media-object-figure {
  margin-right: 1em;
}

.media-object-body {
  flex: 1 0 0;
}

.media-object-body img {
  max-width: 100%;
}
{% endhighlight %}

To further simplify my sandbox, I created a codepen that included the image and media object CSS
which could reproduce my problem.

Apparently, it's a change in spec by Firefox: <https://developer.mozilla.org/en-US/Firefox/Releases/34/Site_Compatibility#CSS>.
And I knew it was going to be a tough one to figure out: <http://stackoverflow.com/questions/27424831/firefox-flexbox-overflow>.

### The codepen to see it in action

Note, you will need to view the pen in Firefox 34+ to see the problem.

<p data-height="268" data-theme-id="125" data-slug-hash="GgjzPd" data-default-tab="result" data-user="johno" class='codepen'>See the Pen <a href='http://codepen.io/johno/pen/GgjzPd/'>Media Object</a> by John Otander (<a href='http://codepen.io/johno'>@johno</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
