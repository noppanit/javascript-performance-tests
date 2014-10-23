var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

function CarPrototypical(name) {
  this.name = name;
  this.speed = 0;
}

CarPrototypical.prototype.rev = function() {
  this.speed++;
};


var CarClosure = function(name) {
  var speed = 0;
  var rev = function() {
    speed++;
  };
  return {
    rev: rev,
    name : name
  };
};

var CarObject = {
  speed : 0,
  rev : function() {
      this.speed++;
  }
}

suite.add('Prototype example', function() {
  var honda = new CarPrototypical();
  honda.rev();
})
.add('Closure example ', function() {
  var honda = new CarClosure();
  honda.rev();
})
.add('Object example', function() {
  CarObject.rev();
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
}).run({ 'async': true });
