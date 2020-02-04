function isPalindrome(num){
  const text = num + '';
  for (let i = 0; i < text.length / 2; i++) {
    if (text[i] != text[text.length - i - 1]) return false;
  }
  return true;
}

console.log(isPalindrome(343));
console.log(isPalindrome(1));
console.log(isPalindrome(546));
console.log(isPalindrome(12121));
console.log(isPalindrome(3437));
