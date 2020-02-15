# Reto Async para Chapter 2. Wrangling the File System

Escriba un programa Node.js que lea  un conjunto de ficheros pasados en vía de comandos y produzca como salida la concatenación de los mismos en el orden especificado:

```
$ concat -f one.txt -f two.txt -f three.txt -o salida.txt
```

Con [commander](https://www.npmjs.com/package/commander?activeTab=readme) es posible indicar una opción que se puede repetir

```js
const program = require('commander');
function collect(value, previous) {
  return previous.concat([value]);
}
program.option('-c, --collect <value>', 'repeatable value', collect, []);
program.parse(process.argv);
console.log(program.collect)
```

```
$ node repeatable-option-commander.js -c a -c b -c c
[ 'a', 'b', 'c' ]
```

Para hacer este reto le conviene leer la sección [The Async Module]({{site.baseurl}}/tema2-async/async-js)

En una segunda parte,considere la posibilidad la posibilidad de excepciones debidas a que alguno de los ficheros no exista