"use strict";

function Arroz(length) {
  if (arguments.length === 1 && typeof length === "number") {
    if (!(length % 1 === 0)) throw new RangeError("Invalid arroz length");

    for (var i = 1; i < length; i++) this[i] = arguments[i];
    this.length = length;
  } else if (arguments.length) {
    for (var i in arguments) this[i] = arguments[i];
    this.length = arguments.length;
  } else {
    this.length = arguments.length;
  }
}

var case1 = new Arroz(10); //-> Arroz.length = 10;
var case2 = new Arroz(1, 2, 3); //-> Arroz( {0:1, 1:2, 2:3, length = 3} )
var case21 = new Arroz("a"); //-> Arroz( {0: 'a', length = 1} );
var case3 = new Arroz(); //-> Arroz( { length = 0} );
