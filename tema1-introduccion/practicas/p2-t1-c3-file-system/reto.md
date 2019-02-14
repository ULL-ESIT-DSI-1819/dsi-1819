# Reto para Chapter 2. Wrangling the File System

Cuando al comando  `ssh` se le pasa además del destino un argumento adicional lo interpreta como un comando y lo ejecuta en la máquina de destino:

```
[~/local/src/CA/sol-nodejs-the-right-way/filesystem-chapter-2(master)]$ ssh dsi ls
labs
snap
```

Escriba  un programa en Node.js
que ejecute en remoto usando `ssh` el programa Node.js pasado como argumento en línea de comandos:

```
[~/local/src/CA/sol-nodejs-the-right-way/filesystem-chapter-2(master)]$ node write-to-a-proces.js 'console.log(2+3)'
child stdout:
5
child process exited with code 0 and signal null
```

Aquí las comillas simples `'console.log(2+3)'` son esenciales 
para proteger la cadena de su interpretación  por la bash shell.

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