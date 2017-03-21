// Euler Problem #1
// Sum of all multiples of 3 and 5 up to 1000 (non-inclusive)
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


// Euler Problem #4: Proto-Attempt
// Largest Palindrome created by multiplying 2 3-digit numbers
highPal = function() {
  var a = 999,
    b = 999,
    highestPal = 0,
    prodString,
    backHalf;
  
  // assumes a 6-digit palindrome will be found
  while (highestPal === 0) {
    prodString = String(a * b);
    console.log(a);
    backHalf = prodString.slice(3).split("").reverse().join("");
    if (prodString.slice(0,3) === backHalf) {
      highestPal = prodString;
    } else {
      if (a === b) {
        a = 999;
        b = b - 1;
      } else {
        a = a - 1
      }
    }
  }
  return highestPal;
}
// first alternated subtracting from b & a [got 698896, which is 836 squared], realized I'd skip 999 * 997
// so switched to still imperfect drop b after each square, have a move from 999 to where b is
// [got 888888 (962 * 924)], but even this would check 997 * 996 before 999 * 995


// Euler Problem #4: Done Right
// Largest Palindrome created by multiplying 2 3-digit numbers
highPal = function() {
  var a = 999,
    b = 999,
    lowestA = 999,
    highestPal = 0,
    prodString,
    backHalf
    startFromSquare = true;
  
  // assumes a 6-digit palindrome will be found
  while (highestPal === 0) {
    prodString = String(a * b);
    console.log(a);
    backHalf = prodString.slice(3).split("").reverse().join("");
    if (prodString.slice(0,3) === backHalf) {
      highestPal = prodString;
    } else { // we need to get next equation
      if (a === 999) { // at end of diagonal, need to start next
        startFromSquare = !startFromSquare;
        if (startFromSquare === true) { // resets to next sqaure: highest pinnacle
          --lowestA;
          a = lowestA;
          b = lowestA;
        } else { // resets to left of pinnacle, for parallel diagonal
          a = lowestA;
          b = lowestA - 1;
        }
      } else { // just slide to next equation along diagonal
        ++a;
        --b;
      }
    }
  }
  return highestPal;
} // returns 906609 (993 x 913)
// I am the 336435th to solve this
// that took some real thinking about the times tables and how to get the exact next highest product!
