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


// Euler Problem #5
// Smallest Multiple of numbers up to 20 (inclusive)
factorFigure = function(num) {
  var product = 1,
    possibleFactors = [],
    updatedArray = [],
    factor,
    j;
  
  for (var i = 2; i <= num; i++) {
    possibleFactors.push(i);
  }

  while (possibleFactors.length > 0) {
    factor = possibleFactors.shift();
    product = product * factor;
    for (j=0; j < possibleFactors.length; j++) {
      if (possibleFactors[j] % factor !== 0) {
        updatedArray.push(possibleFactors[j]);
      } else if (possibleFactors[j] !== factor) {
        updatedArray.push(possibleFactors[j] / factor);
      }
    }
    possibleFactors = updatedArray;
    // console.log(possibleFactors);
    updatedArray = [];
  }
  return product;
} // returns 232792560 (2, 2, 2, 2, 3, 3, 5, 7, 11, 13, 17, 19)
// I am the 346707th to solve this
// Must not look at next problem until I want to solve it, or else I will sit down and solve it immediately


// Euler Problem #6
// The Difference between the sum of all squares vs. the square of all sums for numbers 1-100
sumSquareDiff = function (num) {
  var basicSum = 0,
    squareSum = 0,
    bsSquared = 0
    difference = 0;
  
  for (var i=1; i <= num; i++) {
    basicSum += i;
    squareSum += (i * i);
  }
  bsSquared = basicSum * basicSum;
  difference = bsSquared - squareSum;
  return difference
} // returns 25164150
// I am the 348767th to solve this


// Euler Problem #7
// 10,001st prime number (YIKES!)
nthPrime = function(target) {
  var primes = [],
    counter = 1,
    isComposite,
    i;
  
  while (primes.length < target) {
    ++counter;
    isComposite = false;
    for (i=0; i < primes.length; i++) {
      if (counter % primes[i] === 0) {
        isComposite = true;
        break;
      }
    }
    if (isComposite === false) {
      primes.push(counter);
      // console.log("prime: " + counter);
      // console.log("count:" + primes.length);
    }
  }
  return primes[target -1]
} // returns 104743
// I am the 298922nd to solve this.


// Euler #8 (in two functions)
// Find the largest product created by taking a 13-digit segment of  1000-digit number
prodSegment = function(input) { //input is a number entered as a STRING!
  var candidates = input.split("0"),
    nonZeroSets = [],
    trueCandids = [],
    integers = [],
    saveLast = true,
    counter = 0;
    
  // just break into basic fragments
  for (var i=0; i < candidates.length; i++) {
    if (candidates[i].length === 13) {
      trueCandids.push(candidates[i]);
    } else if (candidates[i].length > 13) {
      nonZeroSets.push(candidates[i]);
    }
  }
  
  // break up bigger fragments, eliminating lower-neighbors along the way
  for (var j=0; j < nonZeroSets.length; j++) {
    integers = nonZeroSets[j].split("");
    counter = 0;
    while (integers.length > 13) {
      if (integers[0] > integers[13]) {
        trueCandids.push(nonZeroSets[j].substr(counter, 13));
        integers.shift(); // recorded better of two, move past both (skipping retests: 112 vs. 83!)
        ++counter
        saveLast = false;
      } else {
        saveLast = true; // hang on to better of two for next test, ensure recording if this is last of set
      }
      integers.shift();
      ++counter
    }
    if (saveLast === true){
      trueCandids.push(nonZeroSets[j].substr(-13));
    }
  }
  return trueCandids
} // array of stringified 13-digit numbers

highestProd = function(array) { // takes array of stringified numbers
  var bestProd = 1,
    currentProd = 1;
  
  for (var i=0; i < array.length; i++) { // deal with each string in array
    for (var j=0; j < array[i].length; j++) { // deal with each char in string
      currentProd = currentProd * array[i][j];
    }
    console.log(currentProd);
    bestProd = (bestProd > currentProd) ? bestProd : currentProd;
    currentProd = 1;
  }
  
  return bestProd;
} // returns 23514624000 (from 5576689664895)
// I am the 254350th to solve this

// Euler #9
// Product of Pythagorean positive integer set where a+b+c=1000
pythagSet = function() {
  var a = 1,
    b = 25,
    raiseB = true,
    answer = 0,
    c = 0;
    
    while (answer !== 1000) {
      if (raiseB === true) {
        ++b;
      } else {
        ++a;
        b = b - 3;
        raiseB = true;
      }
      
      c = Math.sqrt((a * a) + (b * b));
      answer = a + b + c;
      if (answer > 1000) {
        raiseB = false;
      }
      // console.log(b);
    }
    // console.log('a: ' + a);
    // console.log('c: ' + c);
    return a * b * c;
} // returns 31875000 (200, 375, 425)
// I am the 256830th to solve this
