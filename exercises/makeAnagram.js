function makeAnagram(a, b) {
    let common = 0;
    const aArray = a.split('');
    const bArray = b.split('');
    const hashMapA = aArray.reduce((map, value) => {
        map[value] = (map[value]) ? ++map[value] : 1;
        return map;
    }, {});
    const hashMapB = bArray.reduce((map, value) => {
        map[value] = (map[value]) ? ++map[value] : 1;
        return map;
    }, {});
    for (let letter in hashMapA) {
        if (hashMapB[letter])
            common += Math.min(hashMapA[letter], hashMapB[letter]) * 2;
    }
    return a.length + b.length - common;

}

// console.log(makeAnagram("cde", "abc"));
console.log(makeAnagram("fcrxzwscanmligyxyvym", "jxwtrhvujlmrpdoqbisbwhmgpmeoke"));
// console.log(makeAnagram("aaabv", "abbbxcv"));