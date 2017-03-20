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


// Euler Problem #3
// Largest prime factor of 600851475143
largestFactor = function(num) {
  var keepFactoring = true,
    bigNum = num,
    lowFactor = 2,
    checkLimit = Math.floor(Math.sqrt(num));
  
  while (lowFactor < checkLimit) {
    if (bigNum % lowFactor === 0) {
      bigNum = bigNum / lowFactor;
      checkLimit = Math.floor(Math.sqrt(bigNum)); // I hate repeating this, but nowhere better 
      // console.log(lowFactor); // 71, 839, 1471 if you're curious
    } else {
      ++lowFactor;
    }
  }
  return bigNum;
} // returns 6857
// I am the 375972nd to solve this.
// what I don't like about this is that I'm letting lowFactor be so many non-primes,
// but eliminating lowFactor composites pretty much doubles the coding work