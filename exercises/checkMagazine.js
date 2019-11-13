// https://www.hackerrank.com/challenges/ctci-ransom-note/problem
function checkMagazine(magazine, note) {
	let found = false;
    for (let i = 0; i < note.length; i++) {
        found = false;
        for (let j = 0; j < magazine.length; j++) {
            if (note[i] === magazine[j]) {
                found = true;
                magazine.splice(j, 1);
                break;
            }
        }
        if (!found)
            return console.log("No");
    }
    console.log("Yes");
}

checkMagazine("give me one grand today night",
	"give one grand today");
checkMagazine("two times three is not four",
"two times two is four");
checkMagazine("ive got a lovely bunch of coconuts",
"ive got some coconuts");