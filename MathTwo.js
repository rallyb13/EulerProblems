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