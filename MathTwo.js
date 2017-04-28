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

