Number.prototype.plus = function ( num ) {
  return this + num;
};
Number.prototype.minus = function ( num ) {
  return this - num;
};

var number = 100;
var result1 = number.plus(1000);
var result2 = number.minus(10);
console.log(result1);
console.log(result2);
