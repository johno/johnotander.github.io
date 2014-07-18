---
layout: post
title: Create a pretty browser window mockup in HTML+CSS
summary: This ensures that the content can be changed at will be just changing a tag in the HTML rather than opening up Photoshop.
category: Design
---

<link rel="stylesheet" href="{{ "public/css/browser-window.css" | prepend: site.baseurl }}" type="text/css">

Beautifully presenting web pages and apps in context can really help draw in potential users.  This typically consists of placing screenshots in browser windows, phones, etc. with photo editing software. However, I like to avoid Photoshop like the plague, so I wanted to figure out a way to do the same in a text editor. So, I decided to concoct a CSS/HTML solution. 

<div class="full-width browser-box">
  <h1>A trendy cake layer.</h1>
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
        <div class="close sans-serif"> &nbsp; X &nbsp; </div>
        <div class="clear"></div>
      </div>
      <div class="content">
        <div class="html"></div>
        <div class="css"></div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</div>
<div class="clear"></div>
<div class="browser-box-spacer"></div>

And like that, we have a pretty HTML and CSS browser window. Check out the [codepen here](http://codepen.io/johnotander/pen/pfLhy).
