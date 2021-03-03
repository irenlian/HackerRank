function factorial(n) {
  let facNum = 0;
  for (let i = 0; i < n; i++) {
    facNum += n - i;
  }
  return facNum;
}

function calculatePermutations(song) {
  return factorial(song) / (factorial(song - 2) * factorial(2));
}

/*
 * Complete the 'getSongPairCount' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts INTEGER_ARRAY songs as parameter.
 */

function getSongPairCount(songs) {
  // Iterate over an array and calculate unique values
  const uniqueSongs = {};
  for (let song of songs) {
    uniqueSongs[song] = (uniqueSongs[song] || 0) + 1;
  }

  // Sort lengths
  const sortedSongs = Object.keys(uniqueSongs).sort((a, b) => a - b);
  let pairsNumber = 0;
  for (let key of sortedSongs) {
    const song = parseInt(key, 10);
    // if the song is already whole minute length
    if (song % 60 === 0) {
      pairsNumber += calculatePermutations(uniqueSongs[song]);
    }
    // Find the next value in whole minutes. Will check only the bigger values
    let targetLength = song + (60 - song % 60);
    while (targetLength <= sortedSongs[sortedSongs.length - 1] + song) {
      // Try to check whether we have this paired song for target value
      const pair = uniqueSongs[targetLength - song];
      if (pair && targetLength - song > song) {
        // If we found paired song, we calculate permutations of both
        pairsNumber += uniqueSongs[song] * pair;
      }
      // Move to next target
      targetLength += 60;
    }
  }

  return pairsNumber;
}

// console.log(getSongPairCount([20, 30, 150, 100, 40]));
console.log(getSongPairCount([60, 60, 60]));
