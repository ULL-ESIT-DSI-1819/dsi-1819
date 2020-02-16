const program = require('commander');

function collect(value, previous) {
  return previous.concat([value]);
}

program
  .option('-c, --collect <value>', 'repeatable value', collect, [])
;

program.parse(process.argv);

console.log(program.collect)