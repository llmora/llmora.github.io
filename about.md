---
layout: page
title: About
permalink: /about/
---

I like to build things which make people lives better - even if it means having to break something else first.

These are some of the things that I have built:

<div id="archives">
{% for category in site.categories %}
  <div class="archive-group">
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <div id="#{{ category_name | slugize }}"></div>

    <h3 class="category-head">{{ category_name }}</h3>
    <a name="{{ category_name | slugize }}"></a>
    <ul>
    {% for post in site.categories[category_name] %}

      <h4><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></h4>
    {% endfor %}
    </ul>
  </div>
{% endfor %}
</div>

### Contact me

If you need to get in touch, drop me a line at [lluismh@gmail.com](mailto:lluismh@gmail.com) or reach out on [Twitter](https://twitter.com/lluismh).
