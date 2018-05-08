{% for post in site.posts %}
## [{{ post.title | escape }}]({{ post.url }})
{{ post.excerpt }}
{% endfor %}

<!-- {% if site.next_page %}
[{{ paginator.next_page_path }}](Next »)
{% else %}
<span>Next &raquo;</span>
{% endif %} -->
