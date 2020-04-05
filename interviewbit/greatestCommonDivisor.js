function gcd(A, B) {
  if (A === 0 && B === 0) return 1;
  if (A === 0) return B;
  if (B === 0) return A;
  for (let i = Math.min(A, B); i > 0; i--) {
    if (A % i === 0 && B % i === 0) return i;
  }
  return 1;
}

console.log(gcd(6, 96));
