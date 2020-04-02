/*
There are list of competitors and list of reviews (strings)
Need to determine specific number of the strongest competitors
Strong competitor - more mentions in unique reviews
 */




function topNCompetitors(numCompetitors, topNCompetitors, competitors,
                         numReviews, reviews)
{
  // initially sort to pick in alphabetical order
  competitors.sort();

  // create a map used to count mentions
  const competitorsMap = competitors.reduce((competitorsMap, competitor) => {
    competitorsMap[competitor] = 0;
    return competitorsMap;
  }, {});

  // iterate reviews to calculate competitors mentions
  reviews.forEach((review) => {
    review = review.toLowerCase();
    for (let i = 0; i < competitors.length; i++) {
      if (review.includes(competitors[i])) {
        competitorsMap[competitors[i]] += 1;
      }
    }
  });

  // sort competitors by mentions
  const sortedCompetitorsMap = Object.entries(competitorsMap).sort((a, b) => b[1] - a[1]);
  const result = [];

  // check length of array
  let biggestValue = topNCompetitors;
  if (topNCompetitors > sortedCompetitorsMap.length) {
    biggestValue = sortedCompetitorsMap.length;
  }

  // fill final array of top competitors
  for (let i = 0; i < biggestValue; i++) {
    result.push(sortedCompetitorsMap[i][0]);
  }

  return result;
}

/*
You have a matrix of servers. Each of them has value 1 - updated software or 0 - out of date
You need to update all. Update one - if neighbor has update, you can use it
Calculate days to update
 */

function hasUpdatedNeighbors(index, servers, rows) {
  const neighborsIndicies = [];

  // check borders of matrix
  if (index === 0 || index % rows === 1) {
    neighborsIndicies.push(index - 1);
  }
  if (index % rows === 0) {
    neighborsIndicies.push(index + 1);
  }
  if (index - rows >= 0) {
    neighborsIndicies.push(index - rows);
  }
  if (index + rows <= servers.length) {
    neighborsIndicies.push(index + rows);
  }

  // look for update
  for (let index of neighborsIndicies) {
    if (servers[index] === 1) {
      return true;
    }
  }
  return false;
}

function minimumDays(rows, columns, grid) {
  let servers = grid.flat();

  let dayPassed = 0;

  // check if there are out of date servers
  while (servers.includes(0)) {
    const updatedServersToday = [ ...servers ];
    let index = servers.indexOf(0);
    while (index < servers.length && index > -1) {
      if (hasUpdatedNeighbors(index, servers, rows)) {
        updatedServersToday[index] = 1;
      }
      index = updatedServersToday.indexOf(0, index + 1);
    }
    servers = updatedServersToday;
    dayPassed += 1;
   if (servers.filter(x => x=== 1).length) {
    console.log('');
   }
  }
  return dayPassed;
}

// console.log(minimumDays(2, 2, [[0, 1], [0, 0]]));
// console.log(minimumDays(5, 6, [
//   [0, 0, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 0],
//   [0, 1, 0, 0, 0, 0],
// ]));

