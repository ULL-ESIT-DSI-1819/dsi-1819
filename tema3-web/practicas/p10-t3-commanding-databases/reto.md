# Reto 1: Commanding Databases with yargs (p10-t3-commanding-databases)

Reescriba el programa de línea de comandos `esclu` usando `yargs` en vez de `commander`

## yargs

* [yargs en npm](https://www.npmjs.com/package/yargs)
* [Examples](https://github.com/yargs/yargs/blob/master/docs/examples.md)
* [yargs home page](https://yargs.js.org/)

### Ejemplo

```javascript
#!/usr/bin/env node
require('yargs') // eslint-disable-line
  .command('serve [port]', 'start the server', (yargs) => {
    yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000
      })
  }, (argv) => {
    if (argv.verbose) console.info(`start server on :${argv.port}`)
    serve(argv.port)
  })
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .argv
```

```
$ hello-yargs.js --help

hello-yargs.js [command]

Comandos:
  hello-yargs.js serve [port]  start the server

Opciones:
  --help         Muestra ayuda                                        [booleano]
  --version      Muestra número de versión                            [booleano]
  --verbose, -v                                                 [defecto: false]
```

# Reto 2: Commanding Databases with node-fetch (p10-t3-commanding-databases)

Re-escriba `esclu` usando `node-fetch`en vez de `request`

* [node-fetch](https://www.npmjs.com/package/node-fetch)
