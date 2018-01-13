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


// Euler #30 1st attempt: poorly bounded, over-thinking (and over-skipping)
// Sum of ALL numbers that are the sum of each digit raised to the fifth power
fifthPowSum = function() {
  var powers = [ 0, 1, 32, 243, 1024, 3125, 7776, 16807, 32768, 59049 ],
    testNum = 10,
    sum = 0,
    solutions = [],
    digits = [],
    finSum = 0;

  while (String(testNum).length < 7) {
    sum = 0;
    for (var i=0; i<String(testNum).length; i++) {
      sum += powers[Number(String(testNum).charAt(i))];
    }
    
    if (sum === testNum) {
      // if match found, shove into a array, but also keep things moving
      solutions.push(testNum);
      // console.log(testNum);
      testNum++;
    } else if (sum < testNum) {
      // if the sum is smaller, check next number
      testNum++;
    } else {
      // if sum is larger, need a way to jump
      digits = String(testNum).split("").reverse();
      for (var j=0; j<digits.length; j++) {
        if (j === 0 && digits[j] === '0') {
 //TODO: fix jumping from 20 to 100 (should go to 21 or 30 for j=0 case)
          digits[j] = '1';
          break;
        } else if (digits[j] !== '0') {
          digits[j] = '0'
          if (typeof digits[j+1] === 'undefined') {
            digits.push('1');
            break;
          } else if (digits[j+1] !== '9') {
            // if 9, needs to roll over so keeps going
            // otherwise, need to +1 & break out
            digits[j+1] = String(Number(digits[j+1]) + 1);
            break;
          }
        }
      }
      testNum = digits.reverse().join("");
    }
    console.log(testNum);
  }
  for (var k=0; k<solutions.length; k++) {
    finSum += solutions[k];
  }
  return finSum;
} // only got 54748, 92727, 93084, 194979

//2nd attempt
fifthPowSum = function() {
  var powers = [ 0, 1, 32, 243, 1024, 3125, 7776, 16807, 32768, 59049 ],
    testNum = 10,
    sum = 0,
    solutions = [],
    finSum = 0;

  while (testNum < 300000) { // 9^5 * 6 = 354294 (but first two couldn't be 9s!)
    sum = 0;
    for (var i=0; i<String(testNum).length; i++) {
      sum += powers[Number(String(testNum).charAt(i))];
    }
    
    if (sum === testNum) {
      // if match found, shove into a array, but also keep things moving
      solutions.push(testNum);
      console.log(testNum);
    }

    // check next number (brute force, but for less territory)
    testNum++;
  }

  for (var k=0; k<solutions.length; k++) {
    finSum += solutions[k];
  }
  return finSum;
} //returns 443839 from 4150, 4151, 54748, 92727, 93084, 194979
// I am the 83726th to solve this

//Euler #31
//How many different coin combinations make 2 pounds
penceCounter = function() {
  var values = [200, 100, 50, 20, 10, 5, 2, 1],
    coins = [0, 0, 0, 0, 0, 0, 0, 0]
    index = 0,
    counter = 0,
    purse = 0;

  while (coins[0] < 200) {
    // filling moves biggest to smallest
    while (purse < 200) {
      if (values[index] > 200 - purse) {
        //when the biggest coin is too big, move on
        index++;
      } else {
        // add coin to purse && record coinage
        purse += values[index];
        coins[index]++;
      }
    }
    
    console.log(coins);
    // only falls out when purse is full from new combo
    counter++;
    
    // removal moves smallest coin to biggest (so always remove 1p coins)
    purse -= coins[coins.length-1];
    coins[coins.length-1] = 0;
    
    for (var i=coins.length-2; i>-1; i--) {
      if (coins[i] !== 0) {
        // remove lowest-value non-1p coin
        coins[i] = coins[i] - 1;

        // update purse && index, then leave
        purse -= values[i];
        index = i;
        break;
      }
    }
    
    // if just removed last coin of highest value, all its combos are done: pull it
    if (coins[index] === 0 && index === 0) {
      values.shift();
      coins.shift();
    } else {
      // only pull from lower value coins
      index++;
    }
  }
  return counter;
} //returns 73682
// I am the 63801st to solve this


//Euler #32
//Sum of all products where multiplication problem w/ product are pandigital (using 1-9, once each)
panSum = function() {
  var allNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    a = 2,
    notAs = [],
    bLen = 4,
    b = "",
    digits = [],
    index = 0,
    product = 0,
    proDigits = [],
    isPandigital = true,
    validMultiplier = true,
    allProds = [];
  
  // 9-character equations: 1 x 4 = 4 && 2 x 3 = 4; therefore, a can never hit 100 (or 99)
  while(a<99) {
    notAs = [].concat(allNums);
    notAs.splice(notAs.indexOf(a.toString().charAt(0)), 1);
    if (a > 9) {
      notAs.splice(notAs.indexOf(a.toString().charAt(1)), 1);
    }

    // once product jumps to a 5-digit number, it's time to increment a
    while(product < 10000) {
      if (b === "") {
        // just get a starting (lowest possible) number for b
        digits = [].concat(notAs);
        while(b.length < bLen) {
          b += digits.shift();
        }
      } else {
        validMultiplier = false;
        while (validMultiplier === false) {
          b = String(Number(b) + 1);
          digits = [].concat(notAs);
          for (var j=0; j<b.length; j++) {
            // by checking each character that makes up b against digits,
            // can confirm it's not in a, not 0, not a duplicate (due to instant removal)
            index = digits.indexOf(b.charAt(j));
            if (index === -1) {
              validMultiplier = false;
              break;
            } else {
              validMultiplier = true;
              digits.splice(index, 1);
            }
          }
        }
      }
      
      product = a * Number(b);
      isPandigital = true;
      proDigits = product.toString().split("");
      for(var k=0; k<proDigits.length; k++) {
        index = digits.indexOf(proDigits[k]);
        if(index === -1) {
          isPandigital = false;
          break;          
        } else {
          digits.splice(index, 1);
        }
      }
      
      if (isPandigital && allProds.indexOf(product) === -1) {
        allProds.push(product);
        console.log('prod: ', product);
      }
    }
    
    // increase a and reset b && product
    b = "";
    product = 0;
    if (a !== 9) {
      a += 1;
      if (a % 10 === 0 || a % 11 === 0) {
        a += 1;
      }
    } else {
      a = 12;
      bLen = 3;
    }
  }

  return allProds.reduce( (acc, val) => {
    return acc += val;
  }, 0);
} //returns 73682
// I am the 56491st to solve this (6952, 7852, 5796, 5346, 4396, 7254, 7632)


//Euler #33
//Digit-cancelling fractions (49/98, remove common DIGIT is 4/8, which is equal)
//Doing this with zeros is trivial, so find the 4 cases with double-digit numbers (where numerator is always less than denominator)
//Find the product of the four, reduce fraction, and find denominator
funFracts = function() {
  const sortedCandidates = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: []
  },
    winningPairs = []
  let candidate = 11,
    isComposite = false,
    activeArray = [],
    testByNum = 1
  
  // first we drop tens (trivials) and primes (can't be reduced)
  while (candidate < 100) {
    if (candidate % 10 === 0) {
      candidate += 1
    }
    
    sortedCandidates[String(candidate).charAt(0)].push(candidate)
    if (candidate % 11 !== 0) {
      sortedCandidates[String(candidate).charAt(1)].push(candidate)
    }
    candidate += 1
  }
  
  while (testByNum < 10) {
    activeArray = sortedCandidates[testByNum]
    activeArray.forEach((numerator, index, activeArray) => {
      for (let j=index+1; j<activeArray.length; j++) {
        let denominator = activeArray[j],
          reducedNumerator = String(numerator).split(""),
          reducedDenominator = String(denominator).split(""),
          stringToTake = String(testByNum)
        
        reducedNumerator.splice(reducedNumerator.indexOf(stringToTake), 1).join("")
        reducedDenominator.splice(reducedDenominator.indexOf(stringToTake), 1).join("")

        if (numerator / denominator === Number(reducedNumerator) / Number(reducedDenominator)) {
          // console.log(numerator)
          // console.log(denominator)
          winningPairs.push([reducedNumerator, reducedDenominator])
        }
      }
    })
    testByNum += 1
  }
  return winningPairs
} //returns 1/4, 2/5, 1/5, & 4/8 (from 16/64, 26/65, 19/95, & 49/98)
// I manually get 8/800 ~ 1/100, so denominator is 100
// I am the 57230th to solve this


//Euler #34
//Sum of all numbers that are the sum of the factorials of their digits
funFactos = function() {
  const factorials = {
    "0": 1, "1": 1, "2": 2, "3": 6, "4": 24, "5": 120, "6": 720, "7": 5040, "8": 40320, "9": 362880
  },
    winners = []
  let testNum = 10,
    digits = [],
    sum = 0
  
  // 9! * 7 = 2540160--but at best first digit only a 2, and for any > 2mil, first two can't be 9s
  while (testNum < 2000000) {
    digits = String(testNum).split("")
    sum = digits.reduce((acc, x) => acc += factorials[x], 0)
    if (sum === testNum) {
      winners.push(testNum)
      // console.log(testNum)
    }

    testNum += 1  //probably a way to skip past obvious losers once sum > testNum
  }
  
  return winners.reduce((acc, y) => acc += y, 0)
} //returns 40730 (just 145 and 40585)
// I am the 75375th to solve this (0! = 1...dirty)


// #35
// Count of circular primes under 1 million
circPrimes = function() {
  const byDigitObj = { 2: [], 3: [], 4: [], 5: [], 6: [] },
    allPrimes = [2, 3, 5, 7]
  let circPrimes = [2, 3, 5, 7],
    counter = 11,
    digitCount = 2
  
  // find/sort all primes under 1 million
  while (counter < 1000000) {
    let isPrime = true
    for (let i=0; i<allPrimes.length; i++) {
      if (counter % allPrimes[i] === 0) {
        isPrime = false
        break
      }
    }
    if (isPrime === true) {
      allPrimes.push(counter)
      byDigitObj[String(counter).length].push(counter)
      // after seeing answers, realized any number (>9) including 0, 2, 4, 5, 6, or 8 can't be in circular set
    }
    counter++
  }

  while (digitCount < 7) {
    let candidates = byDigitObj[digitCount],
      index = 0

    while (candidates.length > digitCount) {
      let activeString = String(candidates.shift()),
        familiars = [activeString],
        activeDigits = activeString.split("")

      for (let j=1; j<digitCount; j++) {
        activeDigits.unshift(activeDigits.pop())
        activeString = activeDigits.join("")
        index = candidates.indexOf(Number(activeString))
        
        // check if next in circular set is actually a prime
        if (index > -1) {
          // if it is, collect it and remove from candidate array
          familiars.push(activeString)
          candidates.splice(index, 1)
        
          // if it's not, make sure it's not already collected (e.g. 11) 
        } else if (familiars.indexOf(activeString) === -1) {
          // and then junk failed circular set and move on
          familiars = []
          break
        }
      }
      // if (familiars.length > 0) {
      //   console.log('winning familiars: ', familiars)
      // }
      circPrimes = circPrimes.concat(familiars)
    }
    digitCount++
  }
  return circPrimes.length
} // returns 55
// I am the 68169th to solve this


// #36
// All palindromes under a million that are also palindromes in binary
palPal = function() {
  let pals = [1], //because the binary of 1 is 1-digit (1), untestable below, so start with that
    checks = [],
    left = 1,
    right = "",
    oddPal = 0,
    evenPal = 0
  
  while (left < 1000) {
    // create an odd-digit palindrome (1 --> 99999)
    if (left < 10) {
      oddPal = left
    } else {
      right = String(left).slice(0, -1).split("").reverse().join("")
      oddPal = Number(String(left) + right)
    }
    
    //create even-digit pal (11 --> 999999)
    right = String(left).split("").reverse().join("")
    evenPal = Number(String(left) + right)
    
    checks = [oddPal, evenPal]
    checks.forEach((pal) => {
      let binary = pal.toString(2),
        digitCount = binary.length,
        half = digitCount % 2 === 0 ? digitCount/2 : Math.floor(digitCount/2)
      
      if (binary.slice(0, half) === binary.slice(-half).split("").reverse().join("")) {
        // console.log(pal)
        // console.log(binary)
        pals.push(pal)
      }
    })
    left++
  }
  
  return pals.reduce((acc, num) => acc += num, 0)
} // returns 872187
// I am the 71757th to solve this