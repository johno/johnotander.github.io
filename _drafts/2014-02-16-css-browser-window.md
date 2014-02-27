---
layout: post
title: Create a pretty browser window mockup in HTML+Scss instead of using an image.
summary: Rather than using images for simple splash pages and mockups, let's use some Scss.
category: Design
---

Beautifully presenting web pages and apps in context can really help draw in potential user.  This typically consists of placing screenshots in browser windows, phones, etc. with photo editing software. However, I like to avoid Photoshop like the plague, so I wanted to figure out a way to do the same in a text editor. So, I decided to concoct a CSS/HTML solution.

The codepen: <http://codepen.io/johnotander/pen/pfLhy>

```html
<body>
  <div class='browser-window'>
    <div class='top-bar'>
      <div class='circles'>
         <div class="circle circle-red"></div>
         <div class="circle circle-yellow"></div>
         <div class="circle circle-green"></div>
      </div>
    </div>
    <div class='content'>
      
    </div>
    <div class="dev-tools">
      <div class="bar">
        <div class="dev-bar-content"></div>
        <div class="close">X</div>
        <div class="clear"></div>
      </div>
      <div class="content">
        <div class="html"></div>
        <div class="css"></div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</body>
```

```scss
$bottomColor: #E2E2E1;
$topColor: lighten($bottomColor, 2%);

$border: $bottomColor;

$width: 800px;
$height: 500px;

body {
  background-color: #3D9970;
}

.browser-window {
  margin: 20px;
  width: $width;
  height: $height;
  display: inline-block;
  border-radius: 5px;
  background-color: #fff;
}
.browser-window .top-bar {
  height: 30px;
  border-radius: 5px 5px 0 0;
  border-top: thin solid lighten($topColor, 1%);
  border-bottom: thin solid darken($bottomColor, 1%);
  background: linear-gradient($topColor, $bottomColor);
}
.browser-window .circle {
  height: 8px;
  width: 8px;
  display: inline-block;
  border-radius: 50%;
  background-color: lighten($topColor, 10%);
}
.browser-window .circles { margin: 5px 11px; }
.browser-window .content {
  margin: 0;
  width: 100%;
  min-height: 50%;
  display: inline-block;
  border-radius: 0 0 5px 5px;
  background-color: #fafafa;
}

.browser-window .dev-tools {
  width: 100%;
  min-height: 50%;
  margin: 0;
  padding: 0;
}

.browser-window .dev-tools .bar {
  margin-top: -4px;
  border-top: thin solid $topColor;
  border-bottom: thin solid $topColor;
  color: $topColor;
  .dev-bar-content {
    padding: 10px;
    float: left;
  }
  .close { 
    float: right;
    border-left: thin solid $topColor;
    padding: 10px;
  }
}

.browser-window .dev-tools .content {
  .html {
    height: 100%;
    width: 69%;
    border-right: thin solid $topColor;
  }
  .css { 
    float: right;
    height: 100%;
    width: 30%;
  }
}

.clear { clear: both; }
```
