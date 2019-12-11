function isPrime(num) {
    const sqrtNum = Math.sqrt(num);
    for (let i = 2; i <= sqrtNum; i++) {
        if (num % i == 0) return 0;
    }
    return 1;
}

function primesum(A){
      for (let i = 2; i <= A / 2; i++) {
          if (isPrime(i) && isPrime(A - i)) {
              return ([i, A - i]);
          }
      }
      return ([0, 0]);
}

console.log(primesum(10));
