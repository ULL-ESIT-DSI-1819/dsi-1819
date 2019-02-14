Escriba  un programa que ejecute en remoto vía `ssh` el programa Node.js pasado como argumento en línea de comandos:

```
[~/local/src/CA/sol-nodejs-the-right-way/filesystem-chapter-2(master)]$ node write-to-a-proces.js 'console.log(2+3)'
child stdout:
5

child process exited with code 0 and signal null
```

Este programa se conecta vía `ssh` a la máquina virtual de `iaas.ull.es` del pool de la asignatura y ejecuta `node -e 'console.log(2+3)'`.
Esto es, es equivalente a el siguiente comando:

```
[~/local/src/CA/sol-nodejs-the-right-way/filesystem-chapter-2(master)]$ ssh dsi "node -e 'console.log(2+3)'"
5
```
`sol-nodejs-the-right-way/filesystem-chapter-2º`

Sugerencias:

1. Use spawn para crear un proceso que ejecuta `ssh``
2. Pase como argumentos a `ssh` el comando `node` con el argumento `-e` y el programa proveido en línea de comandos
3. Ponga manejadores/callbacks `on('data')` para los streams `stdout` y `stderr` del proceso ejecutando la `ssh` de manera 
que vuelquen en la consola los chunks que van llegando