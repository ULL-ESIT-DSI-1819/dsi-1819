# Web Service

* A Web service is defined as *"a software system designed to support interoperable machine-to-machine interaction over a network"*. 

Web services are frequently just Web APIs that can be accessed over a network, such as the Internet, and executed on a remote system hosting the requested services.

Example:

* [https://developer.github.com/v3/](https://developer.github.com/v3/)
* [https://api.github.com/users/crguezl/orgs](https://api.github.com/users/crguezl/orgs)

#  REST

REST is an acronym that stands for Representational State Transfer.
Representational state transfer (REST) is a software architectural style that defines a set of constraints to be used for creating Web services.

* [REST en http://crguezl.github.io/apuntes-ruby/](http://crguezl.github.io/apuntes-ruby/node566.html)

When an API is RESTful, it is HTTP-based and its resources are identified by their URLs.

Requesting or making a change to a resource comes down to issuing an HTTP request using the particular method that matches your intent.

For example, the HTTP GET method retrieves a resource, and HTTP PUT sends a resource to be saved.

## Idempotent REST APIs

In the context of REST APIs, *when making multiple identical requests has the same effect as making a single request* – then that REST API is called **idempotent**.

> An idempotent HTTP method is an HTTP method that can be called many times without different outcomes. It would not matter if the method is called only once, or ten times over. The result should be the same. It essentially means that the result of a successfully performed request is independent of the number of times it is executed.

* [Idempotent REST APIs](https://restfulapi.net/idempotent-rest-apis)

> When you design REST APIs, you must realize that API consumers can make mistakes. They can write client code in such a way that there can be duplicate requests as well. These duplicate requests may be unintentional as well as intentional some time (e.g. due to timeout or network issues). You have to design fault-tolerant APIs in such a way that duplicate requests do not leave the system unstable.

See also [What are idempotent and/or safe methods?](http://restcookbook.com/HTTP%20Methods/idempotency/) del libro [restcookbook.com/](http://restcookbook.com/)

**Safe methods** are methods that can be cached, prefetched without any repercussions to the resource.

**HTTP POST**

Generally – not necessarily – `POST` APIs are used to **create** a new resource on server. So when you invoke the same POST request `N` times, you will have `N` new resources on the server. So, _`POST` is not idempotent_.

**HTTP PUT**

Generally – not necessarily – `PUT` APIs are used to **update** the resource state. If you invoke a `PUT` API `N` times, the very first request will update the resource; then rest `N-1` requests will just overwrite the same resource state again and again – effectively not changing anything. Hence, _`PUT` is idempotent_.

Recuerda la definición de idempotente: 

> when making **multiple identical requests** has the same effect as making a single request

Si el request es idéntico el fichero no cambiará en los subsiguientes requests

**HTTP DELETE**

When you invoke `N` similar `DELETE` requests, first request will delete the resource and response will be `200` (OK) or `204` (`No Content`). Other `N-1` requests will return `404` (`Not Found`). 

Clearly, the response is different from first request, **but there is no change of state for any resource** on server side because original resource is already deleted. So, _`DELETE` is idempotent_.

Please keep in mind if some systems may have `DELETE` APIs like this:

**DELETE /item/last**

In the above case, calling operation N times will delete N resources – hence `DELETE` is not idempotent in this case. In this case, a good suggestion might be to change above API to `POST` – because `POST` is not idempotent.

**POST /item/last**

Now, this is closer to HTTP spec – hence more REST compliant.

**Resumen de los Distintos Métodos**

<table>
    <tr><th>HTTP Method</th><th>Idempotent</th><th>Safe</th></tr>
    <tr><td>OPTIONS    </td><td>yes       </td><td>yes</td></tr>
    <tr><td>GET        </td><td>yes       </td><td>yes</td></tr>
    <tr><td>HEAD       </td><td>yes       </td><td>yes</td></tr>
    <tr><td>PUT        </td><td>yes       </td><td>no </td></tr>
    <tr><td>POST       </td><td>no        </td><td>no </td></tr>
    <tr><td>DELETE     </td><td>yes       </td><td>no </td></tr>
    <tr><td>PATCH      </td><td>no        </td><td>no </td></tr>
</table>

* See [So when is PATCH not idempotent, then?](https://stackoverflow.com/questions/28459418/rest-api-put-vs-patch-with-real-life-examples/39338329#39338329)

## La práctica p3-t1-c3-http como ejemplo de REST API

```
[~/.../chapter20-nodejs/juanIrache-20_3_public_space(master)]$ pwd -P
/Users/casiano/local/src/javascript/eloquent-javascript-3/juanIrache-solutions/20_3_public_space
```

Quote from the [EJS book hints for this exercise](https://eloquentjavascript.net/20_node.html#i_h8iNiA8ezX):

> You can use the function that implements the `DELETE` method as a blueprint for the `MKCOL` method. When no file is found, try to create a directory with `mkdir`. When a directory exists at that path, you can return a `204` response **so that directory creation requests are <u>idempotent</u>**. If a nondirectory file exists here, return an error code. Code `400` (`bad request`) would be appropriate.

```js
const {mkdir, stat} = require("fs").promises;

methods.MKCOL = async function(request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    await mkdir(path);
    return {status: 204}; // NO CONTENT
  }
  if (stats.isDirectory()) return {status: 204};
  else return {status: 400, body: "Not a directory"};
};
```

## La práctica p3-t1-c3-http y el STATUS 204 

**[204](https://httpstatuses.com/204)**: 

* The server has successfully fulfilled the request and **that there is no additional content to send in the response payload body**.

* A 204 response is terminated by the first empty line after the header fields **because it cannot contain a message body**.

* A 204 response is cacheable by default

Un experimento: si añadimos un `body` a una respuesta `204` en el código de la práctica:


```
[~/.../chapter20-nodejs/juanIrache-20_3_public_space(master)]$ git diff -U12 server.js
```
```diff
diff --git a/20_3_public_space/server.js b/20_3_public_space/server.js
index 79d3f5d..3fa658a 100644
--- a/20_3_public_space/server.js
+++ b/20_3_public_space/server.js
@@ -83,25 +83,25 @@ const { createWriteStream } = require('fs');
 function pipeStream(from, to) {
   return new Promise((resolve, reject) => {
     from.on('error', reject);
     to.on('error', reject);
     to.on('finish', resolve);
     from.pipe(to);
   });
 }
 
 methods.PUT = async function(request) {
   let path = urlPath(request.url);
   await pipeStream(request, createWriteStream(path));
-  return { status: 204 };
+  return { status: 204, body: path };
 };
```

... Y hacemos un request con  `PUT`, observamos que el status `204` hace que no llegue ningún cuerpo al cliente:

<table>
  <tr><th>Server</th><th>Client</th></tr>
  <tr>
    <td><xmp>
    $ nodemon server.js 
    [nodemon] 1.11.0
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching: *.*
    [nodemon] starting `node server.js`
    method= PUT url=/tutu.txt
    </xmp></td>
    <td><xmp>
    $ curl -X PUT -d "hello world!" localhost:8000/tutu.txt
    $ 
    </xmp></td>
  </tr>
  <tr>
  <td>The server returns a 204</td>
  <td>No body received</td>
  </tr>
</table>

If now we change the code to return a status `200`:
```
[~/.../chapter20-nodejs/juanIrache-20_3_public_space(master)]$ git diff server.js
```

```diff
diff --git a/20_3_public_space/server.js b/20_3_public_space/server.js
index 79d3f5d..66fa8b9 100644
--- a/20_3_public_space/server.js
+++ b/20_3_public_space/server.js
@@ -92,7 +92,7 @@ function pipeStream(from, to) {
 methods.PUT = async function(request) {
   let path = urlPath(request.url);
   await pipeStream(request, createWriteStream(path));
-  return { status: 204 };
+  return { status: 200, body: path };
 };
```
And execute the same request, we get the body (the `path` to the modified file):
```
$ curl -X PUT -d "hello world!" localhost:8000/tutu.txt
/Users/casiano/local/src/javascript/eloquent-javascript-3/juanIrache-solutions/20_3_public_space/tutu.txt
```

## Clientes para APIS REST

{% include rest-clients.md %}

## Pagination in the REST API

* [Pagination in the REST API](https://developer.atlassian.com/server/confluence/pagination-in-the-rest-api/)

## Otras Prácticas sobre REST

* [Descripción de la práctica p10-t3-commanding-databases](practicas/p10-t3-commanding-databases)
* [Práctica: developing RESTful Web Services (p11-t3-restful)](practicas/p11-t3-restful)

## Bibliografía Básica

* [Safari. Chapter 6. Commanding Databases](https://proquest-safaribooksonline-com.accedys2.bbtk.ull.es/book/web-development/9781680505344/part-iidot-working-with-data/chp_databases_html)
  * [BULL PuntoQ](https://www.ull.es/servicios/biblioteca/servicios/puntoq/)
  * [GitHub repo ULL-MII-CA-1819/nodejs-the-right-way](https://github.com/ULL-MII-CA-1819/nodejs-the-right-way) con las soluciones (privado)
*  [REST API Tutorial](https://restfulapi.net/)
* Libro [Pro REST API Development with Node.js by Fernando Doglio. Apress 2015](https://proquest-safaribooksonline-com.accedys2.bbtk.ull.es/9781484209172) Book PuntoQ BULL
* [REST with Hypermedia - Hot or Not?](https://reflectoring.io/rest-hypermedia/) blog by Tom Hombergs
  - [mikekelly/hal-browser](https://github.com/mikekelly/hal-browser)
* [Learn API Design](https://github.com/dwyl/learn-api-design)


### [REST API concepts and examples](https://youtu.be/7YcW25PHnAA) (Youtube video)

### [API for beginners](https://youtu.be/oBW_VNg4qD0) (Youtube video) por Le Wagon

- [programmableweb.com/](https://www.programmableweb.com/)
- [How to Send an SMS With Node.js Using Twilio](https://www.twilio.com/blog/2016/09/how-to-send-an-sms-with-node-js-using-twilio.html)
- [Google >Servicios web > Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro?hl=es-419)
- [Wufoo: Crea y comparte tus formularios](https://www.wufoo.com.mx/)
- [Trello for developers](https://developers.trello.com/)
- [Guerrilla Mail - Direcciones de email temporales](https://www.guerrillamail.com/es/)
- [Zapier](https://zapier.com/)
  - [Getting Started With Zapier](https://zapier.com/learn/getting-started-guide/)
- [RequestBin](https://requestb.in/) gives you a URL that will collect requests made to it and let you inspect them in a human-friendly way.
Use RequestBin to see what your HTTP client is sending or to inspect and debug webhook requests.

### [Tutorial: Crear API RESTful utilizando Node.js + Express.js + MongoDB](https://www.programacion.com.py/web/javascript/tutorial-api-rest-usando-node-js-express-mongodb)

### Christopher Buecheler tutorial

* [The Dead-Simple Step-By-Step Guide for Front-End Developers to Getting Up and Running With Node.JS, Express, and MongoDB](https://closebrace.com/tutorials/2017-03-02/the-dead-simple-step-by-step-guide-for-front-end-developers-to-getting-up-and-running-with-nodejs-express-and-mongodb) by Christopher Buecheler
    - [Repo ULL-ESIT-MII-CA-1718/node-tutorial-for-frontend-devs](https://github.com/ULL-ESIT-MII-CA-1718/node-tutorial-for-frontend-devs)
* [Creating a Simple RESTful Web App with Node.js, Express, and MongoDB](https://closebrace.com/tutorials/2017-03-02/creating-a-simple-restful-web-app-with-nodejs-express-and-mongodb)

### [RESTful Web services: The basics](https://www.ibm.com/developerworks/webservices/library/ws-restful/) by Alex Rodríguez

### [Build a RESTful API Using Node and Express 4](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)

- [GitHub repo ULL-ESIT-MII-CA-1718/node-api](https://github.com/ULL-ESIT-MII-CA-1718/node-api)

### [RESTful API From Scratch Using Node, Express and MongoDB](https://youtu.be/eB9Fq9I5ocs) (YouTube video. Sencillo)

### [REST API con Express, Mongodb y Async/Await](https://www.youtube.com/watch?v=0XgRqjAAsaU&list=PLL0TiOXBeDajy0GJ47Ce9dU_iYxddpR4o) 6 vídeos por Fatz


### Google APIs

#### [googlemaps/google-maps-services-js](https://github.com/googlemaps/google-maps-services-js) GitHub

#### [Google Calendar API](https://developers.google.com/google-apps/calendar/)
   1.  [Repo de ejemplo de uso en NodeJS de la API de Calendar](https://github.com/ULL-ESIT-MII-CA-1718/nodejs-google-calendar-example)
   2. Tutorial [Building a Google Calendar Booking App with MongoDB, ExpressJS, AngularJS, and Node.js ](https://github.com/ULL-ESIT-MII-CA-1718/googlecalendarapidemo)
   3. [Google APIs Client Library for JavaScript](https://github.com/google/google-api-javascript-client)
   4. [Google API Client Libraries JavaScript. Tutorial](https://developers.google.com/api-client-library/javascript/start/start-js)

# GitHub API

## Getting started with the API

* [Getting started with the API](https://help.github.com/en/github/extending-github/getting-started-with-the-api)