---
layout: post
title: Decorators on Rails
summary: After giving a lightening talk on Decorators on Rails, I figured the slides needed an accompanying blog post.
category: Rails
---

This is the accompanying blog post for an equivalently titled lightening talk for a [localmotion](http://localmotion.io) #brewby.  [The slides can be found here.](http://johnotander.com/decorators_on_rails)

Decorators can be useful for cleaning up view logic and models in a Rails application. The [Draper gem](https://github.com/drapgergem/draper) makes it essentially seamless to integrate, resulting in a more maintainable codebase that's easier ensure full test coverage. 

## What is a decorator?

The decorator pattern is a design pattern that allows behavior to be added to an individual object without affecting the behavior of other objects from the same class. 

This is useful because we can add additional behavior to an instantiated model, like `@user`, before passing it on to the template from the controller. However, in other contexts, the User model, doesn't have the added behavior that's the result of the decoration. This helps to separate concerns, while still adding necessary functionality to an object when appropriate.

## Why do we care?

<div class="message">
  Your views should be stupid.
</div>

I like to use the analogy that views should read similarly to a shopping list. There shouldn't be any complexity or logic. It should read similarly to:

  - Email
  - Name
  - Joined date
  - Favorite color

However, I'll be the first to admit, that Rails views don't often look like that. _At all_.  It's usually closer to a Magical Realism novel. When an app is still in it's initial iterations of development, this isn't always the worst thing in the world, either. Sometimes you just need to get something shipped in order to see if it's even worth refactoring.

Once you've found your niche, or the codebase and functionality stabilize, it might become worthwhile to begin considering the decorator pattern more seriously.

As Steve Klabnik eloquently stated:

> The whole idea of logic in templates leads to all kinds of problems. They're hard to test, they're hard to read, and it's not just a slippery slope, but a steep one. Things go downhill rapidly.

## A disclaimer

Typically in prototyping, expediency wins. So, it's not usually advisable to start incorporating the decorator pattern in early stage apps. Your views and models should be growing rapidly, and bursting at the seams before you consider utilizing Draper. The Decorator/Presenter pattern should be treating painful symptoms like complex views and unmaintainable models, rather than prematurely accounting for them.

## A fairly typical view

```html+erb
<h1>Show user</h1>

<dl class="dl-horizontal">
  <% if @user.public_email %>
    <dt>Email:</dt>
    <dd><%= @user.email %></dd>
  <% else %>
    <dt>Email Unavailable:</dt>
    <dd><%= link_to 'Request Email', '#', class: 'btn btn-default btn-xs' %></dd>
  <% end %>

  <dt>Name:</dt>
  <dd>
    <% if @user.first_name || @user.last_name %>
      <%= "#{ @user.first_name } #{ @user.last_name }".strip %>
    <% else %>
      No name provided.
    <% end %>
  </dd>
  
  <dt>Joined:</dt>
  <dd><%= @user.created_at.strftime("%A, %B %e") %></dd>
  
  <!-- ... -->
  
</dl>
```

As I've said before, I like my views to read similarly to a shopping list. It lists off the information without any extra cruft. However, the view above doesn't exactly do that. The first place to start refactoring would typically involve moving the view logic into helpers and the User model. That way, at least the view itself will read easily. 

Though this approach begins to muddy up your concerns. String formatting of a model's attributes doesn't belong in a helper because it's data sensitive, but it doesn't belong in the model because it isn't business logic. This is where the decorator comes in. When view logic doesn't exactly belong here nor there, it could be appropriate to be delegated to a decorator.

This ensures ease of testing, because you can focus on only view related logic in your decorator. Which means succinct, pertinent specs in one file, creating more relevant documentation and promoting developer happiness.

## Getting set up with Draper

```ruby
gem 'draper'
```

```bash
$ bundle install
$ rails generate decorator User
```

#### The default decorator.
Found in app/decorators/user_decorator.rb

```ruby
class UserDecorator < Draper::Decorator
  delegate_all
end
```

#### Adding some specs.

```ruby
require 'spec_helper'

describe UserDecorator do

  let(:first_name) { 'John'  }
  let(:last_name)  { 'Smith' }

  let(:user) { FactoryGirl.build(:user, 
                                 first_name: first_name, 
                                 last_name: last_name) }
  
  let(:decorator) { user.decorate }

  describe '.fullname' do

    context 'without a first name' do

      before { user.first_name = '' }

      it 'should return the last name' do
        expect(decorator.full_name).to eq(last_name)
      end
    end

    context 'with a first and last name' do

      it 'should return the full name' do
        expect(decorator.full_name).to eq("#{ first_name } #{ last_name }")
      end
    end

    context 'without a first or last name' do

      before do
        user.first_name = ''
        user.last_name = ''
      end

      it 'should return no name provided' do
        expect(decorator.full_name).to eq('No name provided.')
      end
    end
  end
end
```
