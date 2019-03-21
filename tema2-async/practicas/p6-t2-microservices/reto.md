Escriba un chat con rooms usando 0MQ.

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
