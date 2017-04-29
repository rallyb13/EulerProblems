// Euler #26
// longest recurring cycle when unit fraction converted to decimal for denominators less than 1000
unitFract = function() {
  var result = "",
    nextNum = "",
    keepChecking = true,
    dividend = 10,
    divisor = 1,
    record = 0,
    denom = 0;
  
  for (var i=2; i<1000; i++) {
    result = "",
    keepChecking = true;
    divisor = i;
    dividend = 10;
    while (keepChecking) {
      if (divisor > dividend) {
        nextNum = '0';
        dividend = Number(String(dividend) + '0');
      } else if (dividend % divisor === 0) {
        keepChecking = false;
      } else {
        nextNum = String(dividend / divisor).slice(0,1);
        dividend = Number(String(dividend % divisor) + '0');
      }
      
      if (keepChecking) {
        result += nextNum;
        if (result.length > 5) {
          for (var j=3; j <= result.length/2; j++) {
            if (result.slice(-j) === result.slice(-2 * j, result.length - j)) {
              keepChecking = false;
              // console.log(i);
              // console.log(result);
              if (j > record) {
                record = j;
                denom = i;
                // console.log("record: " + record);
                // console.log("denominator: " + denom);
                // console.log("result: " + result);
              }
            }
          }
        }
      }      
    }
  }
  return denom;
} // returns 983 (982-digit cycle!)
// I am the 62095th to solve this


// Euler #27
// product of coefficients a & b of n^2 +an + b that produces most consecutive values that are primes
// starting with n=0 (a & b are both between -1000 & 1000)
quadPrime = function() {
  var primes = [2, 3],
    checkNum = 2,
    a = -999,
    b = -1000,
    n = 0,
    best = [40, 0, 41],
    solution = 0,
    checkLimit = 0,
    solPrime = true,
    candidatePrime = true,
    i = 0;
    
    while (a < 1000) {
      solPrime = true;
      while (solPrime === true) {
        solution = Math.abs((n * n) + (a * n) + b);
        checkLimit = Math.floor(Math.sqrt(solution));
        i = 0;
        checkNum = primes[0];
        while (checkNum <= checkLimit && solPrime === true) {
          if (solution % checkNum === 0) {
            solPrime = false;
          }
          ++i;
          
          // record next prime if run out (even if just to know it can be skipped)
          while (typeof primes[i] === 'undefined') {
            candidatePrime = true;
            checkNum += 2;
            for (var j=0; j<primes.length; j++) {
              if (checkNum % primes[j] === 0) {
                candidatePrime = false;
                break;
              }
            }
            if (candidatePrime === true) {
              primes.push(checkNum);
            }
          }
          checkNum = primes[i];
        }
        if (solPrime === true) {
          ++n;
        }
      }
      if (n > best[0]) {
        best = [n, a, b];
        console.log(best);
      }
      
      n = 0;
      if (b !== 1000) {
        ++b;
      } else {
        b = -1000;
        ++a;
      }
    }
    
    return best[1] * best[2];
} // returns -59231 (71 consecutive numbers; a = -61; b = 971)
// I am the 65059th to solve this
// Note: surprised how fast the solution popped for that complexity!


// Euler #28
// sum of numbers in diagonals of 1001x1001 grid (numbers entered in clockwise spiral)
sumDiag = function() {
  var total = 1,
    sideLength = 2, // from start-point to corner, won't include other corner
    corner = 1,
    count = 0;
  
  while (sideLength < 1001) {
    count = 0;
    while (count < 4) {
      corner += sideLength;
      total += corner;
      ++count;
    }
    // console.log('side: ' + sideLength);
    // console.log('total: ' + total);

    sideLength += 2;
  }
  return total;
} // returns 669171001
// I am the 82508th to solve this


// Euler #29 (first attempt)
// count of distinct numbers for a^b for when a & b = 2 through 100 (inclusive)
distinctPowers = function() {
  var results = [],
    a = 2,
    b = 2,
    result = 1;
    
  while (a <= 100) {
    result = a;
    b = 2;
    while (b <= 100) {
      result *= a;
      ++b;
      if (results.indexOf(result) === -1) {
        results.push(result);
      }
    }
    ++a;
  }
  return results.length;
} // returns 9379, but due to floating point limits, probably over-counting

// Euler #29 (more clever attempt)
powerCombos = function() {
  var total = 81 * 99, // of 2-100, only 18 numbers have collisions (commented below)
    cases = 4, // basic square pairs: 5&25, 6&36, 7&49, 10&100
    counter = 1,
    exponents = [],
    trueExpo = 1;
    
  while (counter <= 6) {
    for (var i=2; i<101; i++) {
      trueExpo = counter * i;
      if (exponents.indexOf(trueExpo) === -1) {
        exponents.push(trueExpo);
      }
    }
    if (counter % 2 === 0) {
      total += exponents.length * cases;
      cases = 1; // 3/9/27/81 and then 2/4/8/16/32/64
    }
    ++counter;
  }
  return total;
} // returns 9183
// I am the 78095th to solve this