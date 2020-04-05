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
