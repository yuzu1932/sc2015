Number.prototype.plus = function ( num ) {
  return this + num;
};

var number = 100;
var result = number.plus(1000);
console.log(result);
