---
layout: default
---

# Clases

  {% assign previousMonth = "0" %}
  {% for post in site.posts %}
     {% assign currentMonth = post.date | date: "%B" %}
      {% if currentMonth != previousMonth %}
### Classes during the month of {{ currentMonth }}
  
      {% endif %}
* chuchu
  
      {% assign previousMonth = currentMonth %}
  {% endfor %}
