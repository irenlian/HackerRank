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

