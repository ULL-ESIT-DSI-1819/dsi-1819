## Reto: Cookies, Sesiones, Autenticación y Módulos npm (p8-t3-sessions-and-modules)

Cree una web app usando express que gestione uan lista TODO de cosas que hacer.
El cliente puede añadir y suprimir tareas a hacer.
Este es la vista principal:

![todo.png](todo.png)

* Podemos añadir elementos a la lista usando el formulario.  
* Podemos suprimir items haciendo click en las cruces en la lista.  
* La lista es almacenada en la session del visitante.  Si otro se conecta al site, tendrá su propia lista por cuanto está guardada en la session.

Este es el código de la vista en `ejs`:

**[~/javascript/expressjs/todo/my-todolist(master)]$ cat views/todo.ejs**

```html
<!DOCTYPE html>

<html>
    <head>
      <title><%= title %></title>
        <style>
            a {text-decoration: none; color: black;}
        </style>
    </head>

    <body>
      <h1><%= title %></h1>

        <ul>
        <% todolist.forEach(function(todo, index) { %>
            <li><a href="/todo/delete/<%= index %>">✘</a> <%= todo %></li>
        <% }); %>
        </ul>

        <form action="/todo/add/" method="post">
            <p>
                <label for="newtodo">Que más?</label>
                <input type="text" name="newtodo" id="newtodo" autofocus />
                <input type="submit" />
            </p>
        </form>
    </body>
</html>
```

Podemos usar express para el servidor, 
[EJS](https://ejs.co/#docs) para las vistas y como middlewares 

* [express-session](https://www.npmjs.com/package/express-session) y  
* [body-parser](https://www.npmjs.com/package/body-parser):

## Rutas

Su aplicación deberá tener estas rutas:

* Listar las tareas: `/todo`
  - Cuando el request sea con `GET ` mostraremos la vista con la lista de tareas y el formulario
  - Cuando el request sea con `POST ` es que el formulario ha sido rellenado y enviado. Crearemos la tarea  y actualizaremos la vista 
* Añadir tareas: `/todo/add`
* Suprimir la tarea nº `id`:  `/todo/delete/:id:` 
* Cualquier otra ruta será redirigida a `/todo` ([vea el método `redirect` del objeto `response`](http://expressjs.com/es/api.html#res.redirect))




## Recursos
* [Documentación de Express](http://expressjs.com/en/api.html)
* [EJS](https://ejs.co/#docs) 
* [express-session](https://www.npmjs.com/package/express-session) y  
* [cookie-session](https://www.npmjs.com/package/cookie-session)
    - A user session can be stored in two main ways with cookies: on the server or on the client. 
    - cookie-session stores the session data on the client within a cookie, while a module like [express-session](https://www.npmjs.com/package/express-session) stores only a session identifier on the client within a cookie and stores the session data on the server, typically in a database.
* [body-parser](https://www.npmjs.com/package/body-parser)
