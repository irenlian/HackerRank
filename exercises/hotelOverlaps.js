//https://www.interviewbit.com/problems/hotel-bookings-possible/

// time O(N2)
function hotelDraft(arrivals, departures, C) {
  let roomNeeded = 0;
  let i_arrival = 0;
  let i_departure = 0;
  arrivals.sort((a, b) => a - b);
  departures.sort((a, b) => a - b);
  while (i_arrival < arrivals.length || i_departure < departures.length) {
    if (arrivals[i_arrival] < departures[i_departure]) {
      roomNeeded++;
      i_arrival++;
    } else {
      roomNeeded--;
      i_departure++;
    }
    if (roomNeeded > C) return false;
  }
  return true;
}

// time O(N log N)
function hotel(arrivals, departures, C) {
  arrivals.sort((a, b) => a - b);
  departures.sort((a, b) => a - b);
  for (let i = 0; i < arrivals.length; i++) {
    if (i + C < arrivals.length && arrivals[i + C] < departures[i]) {
      return false;
    }
  }
  return true;
}

console.log(hotel([1, 3, 5], [2, 6, 8], 1));
console.log(hotel([ 1, 2, 3 ], [ 2, 3, 4 ], 1));
console.log(hotel([ 13, 14, 36, 19, 44, 1, 45, 4, 48, 23, 32, 16, 37, 44, 47, 28, 8, 47, 4, 31, 25, 48, 49, 12, 7, 8 ],
  [ 28, 27, 61, 34, 73, 18, 50, 5, 86, 28, 34, 32, 75, 45, 68, 65, 35, 91, 13, 76, 60, 90, 67, 22, 51, 53 ], 23));
