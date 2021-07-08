console.log(arguments);
console.log(require('module').wrapper);

// moudle.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.multiply(2, 2));

const calc2 = new C();
console.log(calc2.add(3, 7));


// exports
const { add, multiply, divide } = require('./test-module-2');
console.log(divide(4, 2))


// caching

require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();