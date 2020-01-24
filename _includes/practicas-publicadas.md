{% for practica in site.practicas reversed %}
*  <a href="{{ practica.myurl }}">{{ practica.title | slice: 0, 2  }}: Práctica {{ practica.name }}</a>
{%- endfor %}

