// Task:
// https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string/

/*
Description: Algorithm is based on assumption that the input of the specific letter equals to the number of substrings that could be made up with this letter remaining unique in these substrings.
Time complexity: O(n)
Space complexity: O(1)
*/
function uniqueLetterString(s) {
  const A = 65;
  let count = 0;
  // store previous 2 index when the specific letter has been met
  const letterOccurences = Array(26).fill([]).map(() => [-1,-1]);
  for (let i = 0; i < s.length; i++) {
    const currentLetterOccurences = letterOccurences[s.charCodeAt(i) - A];
    // for each A3 occurence in e.g. A1 **** A2 **** A3
    // count the substrings that would include on one central occurence of this letter
    // it has to start between [A1 + 1, A2] and end between [A2, A3 - 1]
    const substringStartsNumber = currentLetterOccurences[1] - currentLetterOccurences[0];
    const substringEndsNumber = i - currentLetterOccurences[1];
    // the total number of those substrings is (A2 - A1) * (A3 - A2)
    // which equals A2's contribution to the result
    const diffsProduct = substringStartsNumber * substringEndsNumber;
    count += diffsProduct;

    [currentLetterOccurences[0], currentLetterOccurences[1]] = [currentLetterOccurences[1], i]; // short version
    /*
    longer version:
    currentLetterOccurences[0] = currentLetterOccurences[1];
    currentLetterOccurences[1] = i;
    */
  }

  // for last occurences (counting from the end of the string)
  for (const currentLetterOccurences of letterOccurences) {
    const substringStartsNumber = currentLetterOccurences[1] - currentLetterOccurences[0];
    const substringEndsNumber = s.length - currentLetterOccurences[1];
    const diffsProduct = substringStartsNumber * substringEndsNumber;
    count += diffsProduct;
  }
  return count;
};

const testCases = {
  inputs: [
    "ABC",
    "ABA",
    "LEETCODE",
    "ABBCDB",
    "A",
    "AAAA",
    "ABABABABABABBBABBBBBBABBBBBABAAAAAAB",
    "ZABCZ",
    "ASDDDFGH"
  ],
  outputs: [
    10,
    8,
    92,
    36,
    1,
    4,
    177,
    33,
    70
  ]
}

testCases.inputs.forEach((input, i) => {
  console.log(`For ${input} the result is ${uniqueLetterString(input) === testCases.outputs[i] ? 'correct' : 'wrong'}`)
})

