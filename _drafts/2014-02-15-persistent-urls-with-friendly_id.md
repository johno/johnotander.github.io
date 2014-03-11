---
layout: post
title: Persistent Urls with Friendly ID
summary: Sometimes the friendly_id gem can cause urls to break when the slug content is changed. I've proposed a change for scenarios when we can't afford for past urls to be broken.
category: Rails
---

## How is this achieved?

The slug can always be generated with a prefixed id. So, if you had a model similar to:

```ruby
class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged

  # ...

  private

    def slug_candidates
       [:id, :username]
    end
end
```

You can always infer, from the `id`, what the model is later on, even if the username slug has changed.
