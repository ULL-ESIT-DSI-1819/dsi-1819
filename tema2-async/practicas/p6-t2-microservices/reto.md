# Retos para la práctica p6-t2-microservices

## Reto 1: Granja de Trabajadores

En el paradigma de paralelismo conocido como *Farm* o *Granja de
Procesadores* la tarea es dividida en el subconjunto de tareas a
realizar. 
1. Un procesador denominado maestro o capataz envia las
tareas a las restantes estaciones-trabajadores. 
2. Tan pronto como un trabajador devuelve el resultado de una tarea el capataz le da una
nueva subtarea. 
3.  El capataz combina el resultado parcial con los que
haya obtenido hasta ese momento. 

Una ventaja que tiene este paradigma es que consigue equilibrar la carga de trabajo entre las máquinas,
independientemente de que estas sean heterogéneas o no, independientemente
de cual sea la carga dinámica de las estaciones por la presencia
de otros procesos y usuarios e independientemente de que las tareas
sean heterogéneas en sus necesidades de tiempo de cómputo.

$$
\begin{align*}
  & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right)
  = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\
  & (x_1, \ldots, x_n) \left( \begin{array}{ccc}
      \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\
      \vdots & \ddots & \vdots \\
      \phi(e_n, e_1) & \cdots & \phi(e_n, e_n)
    \end{array} \right)
  \left( \begin{array}{c}
      y_1 \\
      \vdots \\
      y_n
    \end{array} \right)
\end{align*}
$$


## Reto 2: Chat

Escriba un chat de línea de comandos - con rooms - usando 0MQ.

1. Use el patrón PUB/SUB. 
2. Use el "tópico" del patrón PUB/SUB para implantar las rooms
   1. En el servidor:

      ```js
           publisher.send( ["room-1", // topic
                              JSON.stringify(
                                {
                                  type: "message",
                                  from: user,
                                  content: content
                                }
                              )
                            ]
      ```
   2. En el cliente:

      ```js
      subscriber.on("message", (room, data) => {
        console.log(room.toString());
        const message = JSON.parse(data);
        ...
      });
      ```
3. En el cliente, para la lectura desde teclado use [readline](https://nodejs.org/api/readline.html#readline_readline). Sigue un ejemplo:

  Fichero **local/src/javascript/learning/readline-examples/small-cli.js**

  ```js
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'DSI> '
  });

  const bye = () => {
    console.log('Have a great day!');
    process.exit(0);
  };

  const methods = {
    hello: () => console.log("world"),
    exit: () => bye(),
    default: (line) => console.log(`Say what? I might have heard '${line.trim()}'`),
  };

  rl.prompt();

  rl.on('line', (line) => {
    const choice = line.trim();
    if (choice in methods) methods[choice]();
    else methods['default'](line);
    rl.prompt();
  }).on('close', () => bye);
  ```
4. El cliente envía sus mensajes al servidor usando un socket 0MQ  REQ/REP.
El cliente envía su mensaje al servidor como un request JSON indicando la *room* a la que va dirigida. 
El servidor, una vez recibe el mensaje en el socket REQ/REP, lo 
publica a los clientes conectados a la room especificada usando el socket PUB/SUB

