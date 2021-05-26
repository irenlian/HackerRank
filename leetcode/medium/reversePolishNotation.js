// https://leetcode.com/problems/evaluate-reverse-polish-notation

const OPERATORS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => b ? (a / b > 0 ? Math.floor(a / b) : Math.ceil(a / b)) : 0,
};

function evalRPN(tokens) {
  const stack = [];
  for (const token of tokens) {
    if (OPERATORS[token]) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(OPERATORS[token](a, b));
    } else {
      stack.push(parseInt(token, 10));
    }
  }
  return stack.pop();
};

console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]) === 22);
console.log(evalRPN(["2","1","+","3","*"]) === 9);
console.log(evalRPN(["4","13","5","/","+"]) === 6);
