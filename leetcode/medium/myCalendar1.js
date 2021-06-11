// https://leetcode.com/problems/my-calendar-i

class MyCalendar {
  events;
  constructor() {
    this.events = [];
  }

  isIntersected(event, point) {
    if (event[0] <= point[0] && point[0] < event[1]) return true;
    if (event[0] < point[1] && point[1] <= event[1]) return true;
    if (event[0] >= point[0] && point[1] >= event[1]) return true;
    return false;
  }

  // Binary search on sorted array - O(logN)
  findEvent(arr, start, end) {
    if (!arr.length) return null;
    const middle = Math.floor(arr.length / 2);
    if (this.isIntersected(arr[middle], [start, end])) {
      return arr[middle];
    }
    if (start < arr[middle][0]) return this.findEvent(arr.slice(0, middle), start, end);
    return this.findEvent(arr.slice(middle + 1), start, end);
  }

  // Search intersection - O(logN) + Push event in sorted manner - O(N)
  // Total time complexity - O(n)
  // Space complexity - O(n)
  // could be improved to logN to insert element the search or even return the next element during search
  book(start, end) {
    if (this.findEvent(this.events, start, end)) return false;
    const indexOfNext = this.events.findIndex(event => event[0] > start);
    if (indexOfNext === -1) this.events.push([start, end]);
    else if (indexOfNext === 0) this.events.unshift([start, end]);
    else this.events.splice(indexOfNext, 0, [start, end]);
    return true;
  }
}

const obj = new MyCalendar();

const input =
  [[97,100],[33,51],[89,100],[83,100],[75,92],[76,95],[19,30],[53,63],[8,23],[18,37],[87,100],[83,100],[54,67],[35,48],[58,75],[70,89],[13,32],[44,63],[51,62],[2,15]];
const expected = [true,true,false,false,true,false,true,true,false,false,false,false,false,false,false,false,false,false,false,true];
input.forEach((item, i) => console.log(obj.book(...item) === expected[i]));

