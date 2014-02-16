---
layout: post
title: Decorators on Rails
summary: After giving a lightening talk on Decorators on Rails, I figured the slides needed an accompanying blog post.
category: Rails
---

This is the accompanying blog post for a similarly titled lightening talk for a [localmotion](http://localmotion.io) #brewby.  [The slides can be found here.](http://johnotander.com/decorators_on_rails)

Decorators can be very useful for cleaning up view logic and models in a Rails application. The [Draper gem](https://github.com/drapgergem/draper) makes it simple, and worthwhile, to incorporate the pattern into an existing codebase. Resulting in something easier to maintain, with presentation logic in it's own special object.

## What is a decorator?

The Decorator pattern is a design pattern that allows behavior to be added to an individual object without affecting the behavior of other objects from the same class. 

This is useful because we can add additional behavior to an instantiated model, like `@user`, before passing it on to the template from the controller. However, in other contexts, the User model, doesn't have the added behavior that's the result of the decoration. This helps to separate concerns, while still adding necessary functionality to an object when appropriate.

## Why do we care?

<div class="message">
  Your views should be stupid.
</div>

I like to use the analogy that views should read similarly to a shopping list. There shouldn't be any complexity or logic. It should just simply read:

  - Email
  - Name
  - Joined date
  - Favorite color

However, I'll be the first to admit, that Rails views don't often look like that. _At all_.  It's usually closer to a Magical Realism novel. When an app is still in it's initial iterations of development, this isn't always the worst thing in the world, either. Sometimes you just need to get something shipped in order to see if it's even worth refactoring.

### A disclaimer

Typically in prototyping, expediency wins. So, it's not usually advisable to start incorporating the Decorator pattern in early stage apps. Your views and models should be growing rapidly, and bursting at the seams before you consider utilizing Draper. The Decorator/Presenter pattern should be treating painful symptoms like complex views and unmaintainable models.





