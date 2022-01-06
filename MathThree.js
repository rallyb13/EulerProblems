// Eulers 51-??

// Euler #51
// First 8-member family numbers where digit(s) replaced in the same place are primes (7-member family 56xx3)
primeFam = function() {
  const primes = [2],
    autoFiveCodes = ["012x4", "01x34", "0x234", "x1234"],
    conditionalFCodes = ["01xy4", "0x2y4", "x12y4", "0xy34", "x1y34", "xy234"],
    autoSixCodes = ["0123x5", "012x45", "01x345", "0x2345", "x12345"],
    conditaionalSixCodes = ["012xy5", "01x3y5", "0x23y5", "x123y5", "01xy45", "0x2y45", "x12y45", "0xy345", "x1y345", "xy2345", "01xyz5", "0x2yz5", "x12yz5", "0xy3z5", "x1y3z5", "xy23z5", "0xyz45", "x1yz45", "xy2z45", "xyz345"],
    autoSevCodes = ["01234x6", "0123x56", "012x456", "01x3456", "0x23456", "x123456"],
    conditionalSevCodes = ["0123xy6", "012x4y6", "01x34y6", "0x234y6", "x1234y6", "012xy56", "01x3y56", "0x23y56", "x123y56", "01xy456", "0x2y456", "x12y456", "0xy3456", "x1y3456", "xy23456", "012xyz6", "01x3yz6", "0x23yz6", "x123yz6", "01xy4z6", "0x2y4z6", "x12y4z6", "0xy34z6", "x1y34z6", "xy234z6", "01xyz56", "0x2yz56", "x12yz56", "0xy3z56", "x1y3z56", "xy23z56", "0xyz456", "x1yz456", "xy2z456", "xyz3456"]
  let counter = 3,
    codes = {},
    autoCodes = [],
    condiCodes = [],
    winners = []
    
  
  // prime collector
  while (counter < 10000000) {
    let limit = Math.ceil(Math.sqrt(counter)),
      isPrime = true
    for (let i=0; primes[i]<=limit; i++) {
      if (counter % primes[i] === 0) {
        isPrime = false
        break
      }
    }
    if (isPrime === true) {
      primes.push(counter)
      // console.log(counter)
      let strCount = String(counter)
      if (counter > 1000000) {
        autoCodes = autoSevCodes
        condiCodes = conditionalSevCodes
      } else if (counter > 100000) {
        autoCodes = autoSixCodes
        condiCodes = conditaionalSixCodes 
      } else if (counter > 10000) {
        autoCodes = autoFiveCodes
        condiCodes = conditionalFCodes
      }
      autoCodes.forEach(code => {
        let codeKey = code.split("").reduce((acc, char) => {
          if (char === "x") {
            return acc + "x"
          } else {
            return acc + strCount.charAt(char)
          }
        }, "c")
        if (typeof codes[codeKey] === "undefined") codes[codeKey] = []
        codes[codeKey].push(counter)
        if (codes[codeKey].length === 8) winners.push(codes[codeKey])
      })
      
      condiCodes.forEach(cod => {
        let codBits = cod.split(""),
          doProcess = false,
          codKey = ""

        if (strCount.charAt(codBits.indexOf("x")) === strCount.charAt(codBits.indexOf("y"))) {
          if (codBits.includes("z")) {
            doProcess = strCount.charAt(codBits.indexOf("x")) === strCount.charAt(codBits.indexOf("z"))
          } else {
            doProcess = true
          }
        }
        if (doProcess === true) {
          codKey = codBits.reduce((ac, cha) => {
            if (cha === "x" || cha === "y" || cha === "z") {
              return ac + "x"
            } else {
              return ac + strCount.charAt(cha)
            }
          }, "c")
          if (codKey !== "") {
            if (typeof codes[codKey] === "undefined") codes[codKey] = []
            codes[codKey].push(counter)
            if (codes[codKey].length === 8) {
              winners.push(codes[codKey])
              // console.log(codKey)
            }
          }
        }
      })
    } else if (counter === 100000 || counter === 1000000) {
      codes = {}
    }
    ++counter
  }
  return winners
} // returns 5 sets, starting with: [ 121313, 222323, 323333, 424343, 525353, 626363, 828383, 929393 ] x2y3z3
// I am the 26182nd to solve this


// Euler #52
// Smallest number x whose digits rearranged into 2x, 3x, 4x, 5x, & 6x
permutedMultiples = function() {
  let starter = 10;
  let ender = 16;
  let matchAll = false;
  let candidate;
  
  while (matchAll === false) {
    candidate = starter;
    
    while(candidate <= ender && matchAll === false) {
      let origDigits = String(candidate).split("");
      let multipleSets = [
        String(candidate * 2).split(""),
        String(candidate * 3).split(""),
        String(candidate * 4).split(""),
        String(candidate * 5).split(""),
        String(candidate * 6).split("")
      ];

      let matchDigit = true;
      while (matchDigit === true && origDigits.length) {
        const digitToMatch = origDigits.shift();
        for (var i=0; i < multipleSets.length; i++) {
          const digitSet = multipleSets[i]
          const indexOfMatch = digitSet.indexOf(digitToMatch);

          if (indexOfMatch === -1) {
            matchDigit = false;
            break;
          } else {
            digitSet.splice(indexOfMatch, 1);
          }
        }
      }

      if (matchDigit === true) {
        matchAll = true;
      } else {
        ++candidate
      }
    }

    starter = starter * 10;
    ender = ender * 10 + 6;
  }
  
  return candidate;
} // returns 142857
// I am the 65984th to solve this
