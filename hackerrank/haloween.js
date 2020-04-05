// https://www.hackerrank.com/challenges/halloween-sale/problem

function howManyGames(p, d, m, s) {
  // Return the number of games you can buy
  let num = 0;
  while (s > 0) {
    s -= p;
    if (s >= 0) num++;
    if (p - d >= m) p -= d;
    else p = m;
  }
  return num;
}
