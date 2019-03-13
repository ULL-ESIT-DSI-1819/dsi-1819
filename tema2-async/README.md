# Tema 2: Entornos de Trabajo y Patrones para la Computación Asíncrona y Distribuida

## Capítulo 1: Sockets

### Sockets TCP y UDP

* [Safari. Chapter 3 Networking with Sockets](https://proquest-safaribooksonline-com.accedys2.bbtk.ull.es/book/web-development/9781680505344/part-idot-getting-up-to-speed-on-nodedotjs-8/chp_networking_html)
* [GitHub repo ULL-MII-CA-1819/nodejs-the-right-way](https://github.com/ULL-MII-CA-1819/nodejs-the-right-way)
  * [Networking with Sockets](https://github.com/ULL-MII-CA-1819/nodejs-the-right-way/tree/master/networking-with-sockets-chapter-3)
* Video en YouTube. UPM. Node.JS: Programación con Sockets TCP/IP:
  * [Video en YouTube. UPM. Node.JS: Programación con Sockets TCP/IP](https://youtu.be/UjH7hw9fWWQ)

### Prácticas

* [Descripción de la práctica p4-t2-networking](practicas/p4-t2-networking)

## Capítulo 2: Message Queues

* 0MQ
  * [Building Distributed Systems with Node.js and ØMQ](https://github.com/ULL-MII-CA-1819/node-zmq-talk) Jim Wilson Talk
  * [Using ZeroMQ with Node.js](https://rastating.github.io/using-zeromq-with-node-js/)
  * [Repo Connecting Robust Microservices](https://github.com/ULL-MII-CA-1819/nodejs-the-right-way)
  * [GitHub Repo ULL-MII-CA-1819/nodejs-the-right-way](https://github.com/ULL-MII-CA-1819/nodejs-the-right-way/tree/master/connecting-robust-microservices-chapter-4) Chapter 4: Connecting Robust Microservices
* RabbitMQ
  * [Part 1: RabbitMQ for beginners - What is RabbitMQ?](https://www.cloudamqp.com/blog/2015-05-18-part1-rabbitmq-for-beginners-what-is-rabbitmq.html)
  * [Part 2.2: Getting started with RabbitMQ and Node.js](https://www.cloudamqp.com/blog/2015-05-19-part2-2-rabbitmq-for-beginners_example-and-sample-code-node-js.html)
  * [CloudAMQP with Node.js Getting started](https://www.cloudamqp.com/docs/nodejs.html)
  * [Repo ULL-MII-CA-1819/rabbit-mq-learning](https://github.com/ULL-MII-CA-1819/rabbit-mq-learning) with my experience with RabbitMQ

### Prácticas

* [Descripción de la práctica Connecting Robust Microservices (p6-t2-microservices](practicas/p6-t2-miroservices)


## Capítulo 3: Programación Asíncrona en ECMA 6

1. [Asynchronous Programming with Javascript](https://courses.edx.org/courses/course-v1:Microsoft+DEV234x+1T2018a/course/) EdX Course
2. Book Exploring ES6
  1. [Book Exploring ES6: 24. Asynchronous programming (background) ](http://exploringjs.com/es6/ch_async.html)
  5. [Book Exploring ES6: 25. Promises for asynchronous programming](http://exploringjs.com/es6/ch_promises.html)
3. Book Understanding ECMAScript 6
  1. [Book Understanding ECMAScript 6: Iterators and Generators](https://leanpub.com/understandinges6/read#leanpub-auto-iterators-and-generators)
  4. [Book Understanding ECMAScript 6: Promises and Asynchronous Programming](https://leanpub.com/understandinges6/read#leanpub-auto-promises-and-asynchronous-programming)
7. [Book You Don't Know JS: Chapter Async & Performance](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20&%20performance/README.md#you-dont-know-js-async--performance)
8. [Book ASYNC JavaScript: Build More Responsive Apps with Less Code](https://github.com/tain335/tain335/blob/master/books/Async%20JavaScript%20Build%20More%20Responsive%20Apps%20with%20Less%20Code.pdf)
9. [Node.js 8: util.promisify()](http://2ality.com/2017/05/util-promisify.html) by Dr. Axel Rauschmayer 
2. [Async examples in JS in GitHub](https://github.com/search?utf8=%E2%9C%93&q=async-examples+language%3Ajavascript&type=Repositories) 
6. [Book Eloquent JS: Handling Events](http://eloquentjavascript.net/14_event.html)

## Capítulo 4: RPC

In gRPC a client application can directly call methods on a server application on a different machine as if it was a local object, making it easier for you to create distributed applications and services. As in many RPC systems, gRPC is based around the idea of defining a service, specifying the methods that can be called remotely with their parameters and return types. 

On the server side, the server implements this interface and runs a gRPC server to handle client calls. On the client side, the client has a stub (referred to as just a client in some languages) that provides the same methods as the server.

gRPC clients and servers can run and talk to each other in a variety of environments - from servers inside Google to your own desktop - and can be written in any of gRPC’s supported languages. 
In addition, the latest Google APIs will have gRPC versions of their interfaces, letting you easily build Google functionality into your applications.

* [Intro to gRPC: A Modern Toolkit for Microservice Communication](https://youtu.be/RoXT_Rkg8LA) YouTube 
* [What is gRPC?](https://grpc.io/docs/guides/)
  - [gRPC Documentation](https://grpc.io/docs/guides/)

## Recursos

**Módulos en ECMA5**

* [Módulos en ECMA5. Eloquent JS. Capítulo 10](http://eloquentjavascript.net/10_modules.html)
  - [Repo de Ejemplo del Capítulo 10](https://github.com/ULL-ESIT-MII-CA-1718/ejs-chapter10-modules)
  - [Repo de Ejemplo del Capítulo 10: Sección Require](https://github.com/ULL-ESIT-MII-CA-1718/ejs-chapter10-modules/tree/master/require)
  - [Repo de Ejemplo del Capítulo 10: Sección Slow-loading modules](https://github.com/ULL-ESIT-MII-CA-1718/ejs-chapter10-modules/tree/master/slow-loading-modules)
* [ECMA5. The revealing module pattern: Again with the Module Pattern – reveal something to the world](http://christianheilmann.com/2007/08/22/again-with-the-module-pattern-reveal-something-to-the-world/)
* [JavaScript Module Systems Showdown: CommonJS vs AMD vs ES2015](https://auth0.com/blog/javascript-module-systems-showdown/)

**Handling Events**

* [Chapter 14: Handling Events](http://eloquentjavascript.net/14_event.html)
* [How to Create Custom Events in JavaScript](https://www.sitepoint.com/javascript-custom-events/)
* [Repo ULL-ESIT-MII-CA-1718/ejs-chapter14-handling-events con ejemplos y ejercicios](https://github.com/ULL-ESIT-MII-CA-1718/ejs-chapter14-handling-events)
* [JavaScript and CSS: Coordinates](https://javascript.info/coordinates)

**HTTP**

* [Eloquent JS: HTTP](http://eloquentjavascript.net/17_http.html)
  - [Repo de Ejemplo del Capítulo](https://github.com/ULL-ESIT-MII-CA-1718/ejs-chapter17-HTTP)
* [Build a RESTful API Using Node and Express 4](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)
  - [GitHub repo ULL-ESIT-MII-CA-1718/node-api](https://github.com/ULL-ESIT-MII-CA-1718/node-api)
* [Understanding HTTP Request Response Messages](https://youtu.be/sxiRFwQ1RJ4) YouTube Video
