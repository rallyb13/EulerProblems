// Euler Problem #1
// Sum of all multiples of 3 and 5 between up to 1000 (non-inclusive)
multiples = function () {
  var sum = 0;
  for (var i=0; i < 1000; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum = sum + i;
    }
  }
  return sum;
} // returns 233168
// I am the 646106th to solve this.
// cooler still, could take 3, 5, & 1000 as args
// get the sum of any two multiples up to any number

// Euler Problem #2
// Sum of all even numbers in the Fibonacci sequence that are under 4mil
fibEvens = function() {
  var sum = 0,
    count = 0,
    a = 1,
    b = 1,
    c = 0;
  
  while (b < 2500000) {
    c = a + b;
    if (count % 3 === 0) {
      sum = sum + c;
      // console.log(c);
    }
    ++count;
    a = b;
    b = c;
  }
  return sum;
} // returns 4613732
// I am the 523054th to solve this.
// *could* && c < 4000000 for if, and use c for while condition--didn't need to