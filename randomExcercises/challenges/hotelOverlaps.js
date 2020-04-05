// https://www.interviewbit.com/problems/hotel-bookings-possible/

// time O(N2)
const hotelN2 = (arrivals, departures, rooms) => {
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
    if (roomNeeded > rooms) return false;
  }
  return true;
};

// time O(N log N)
const hotelNlogN = (arrivals, departures, rooms) => {
  arrivals.sort((a, b) => a - b);
  departures.sort((a, b) => a - b);
  for (let i = 0; i < arrivals.length; i++) {
    if (i + rooms < arrivals.length && arrivals[i + rooms] < departures[i]) {
      return false;
    }
  }
  return true;
};

// time O(N) = O(N * 14 + N + N) = O(3N)
const hotelN = (arrivals, departures, rooms) => {
  // create map for all dates during each checkin and checkout
  // count number of already booked rooms for each of these dates
  const bookingDates = {};
  for (let i = 0; i < arrivals.length; i++) {
    for (let day = arrivals[i]; day < departures[i]; day++) {
      if (bookingDates[day]) bookingDates[day]++;
      else bookingDates[day] = 1;
    }
  }
  // check all our days in map whether all rooms are booked
  for (let i = 0; i < arrivals.length; i++) {
    if (bookingDates[arrivals[i]] && bookingDates[arrivals[i]] > rooms) {
      return false;
    }
  }
  for (let i = 0; i < departures.length; i++) {
    if (bookingDates[departures[i] - 1] && bookingDates[departures[i] - 1] > rooms) {
      return false;
    }
  }
  return true;
};

exports.hotel = hotelN;
// exports.hotel = hotelNlogN;

const reservationOverlaps = (booking1, booking2) => (new Date(booking1.checkin).getTime() >= new Date(booking2.checkin).getTime()
    && new Date(booking1.checkin).getTime() <= new Date(booking2.checkout).getTime())
  || (new Date(booking1.checkout).getTime() >= new Date(booking2.checkin).getTime()
    && new Date(booking1.checkout).getTime() <= new Date(booking2.checkout).getTime());

// time O(N) = O(14*N + 14) where 14 - average booking length
exports.reservation = (reservations, checkin, checkout, rooms) => {
  if (!reservations) {
    reservations = [];
  }
  // dates are not valid
  if (!checkin || !checkout || isNaN(new Date(checkin)) || isNaN(new Date(checkout))) {
    return false;
  }
  // dates are in the past or interchanged
  if (new Date(checkout).getTime() < new Date(checkin).getTime()
    // should be compared with current date but for test I use last year
    || new Date(checkin).getTime() < new Date('2019-01-01').getTime()
    || new Date(checkout).getTime() < new Date('2019-01-01').getTime()) {
    return false;
  }
  // create map for all dates during target checkin and checkout
  // count number of already booked rooms for each of these dates
  const bookingDates = {};
  reservations.forEach((booking) => {
    if (booking && reservationOverlaps(booking, { checkin, checkout })) {
      for (let i = new Date(booking.checkin); i < new Date(booking.checkout); i.setDate(i.getDate() + 1)) {
        if (i.getTime() >= new Date(checkin).getTime() && i.getTime() < new Date(checkout).getTime()) {
          if (bookingDates[i]) bookingDates[i]++;
          else bookingDates[i] = 1;
        }
      }
    }
  });
  // check all our days in map whether all rooms are booked
  for (let i = new Date(checkin); i < new Date(checkout); i.setDate(i.getDate() + 1)) {
    if (bookingDates[i] && bookingDates[i] >= rooms) {
      return false;
    }
  }
  return true;
};
