/*
* Segmented least recently used cache policy
* Own implementation and is not optimized yet
*
* Description:
* SLRU cache is divided into two segments, a probationary segment and a protected segment.
* Lines in each segment are ordered from the most to the least recently accessed.
* Data from misses is added to the cache at the most recently accessed end of the probationary segment.
* Hits are removed from wherever they currently reside and added
* to the most recently accessed end of the protected segment.
* Lines in the protected segment have thus been accessed at least twice.
* The protected segment is finite, so migration of a line from the probationary segment
* to the protected segment may force the migration of the LRU line in the protected segment
* to the most recently used (MRU) end of the probationary segment, giving this line another chance
* to be accessed before being replaced.
* The size limit on the protected segment is an SLRU parameter that varies according
* to the I/O workload patterns.
* Whenever data must be discarded from the cache,
* lines are obtained from the LRU end of the probationary segment.
*/

class DB {
  get(key) {
    return Math.random() * 10 * key;
  }
}

class Element {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class SLRU {
  constructor() {
    this.db = new DB();
    this.probationarySegment = [];
    this.protectedSegment = [];
    this.probationarySegmentSize = 4;
    this.protectedSegmentSize = 4;
    this.cacheUsage = 0;
  }

  get(key) {
    // try to find the key in the cache
    let value = this.search(key);
    if (value) {
      this.cacheUsage += 1;
      return value;
    }

    // if there is no value, get it from database and save it to the cache
    value = this.db.get(key);
    this.save(key, value);
  }

  save(key, value) {
    // save new elem in the beginning (top of the queue)
    const elem = new Element(key, value);
    this.probationarySegment.unshift(elem);

    // eliminate the least recent used element
    if (this.probationarySegment.length > this.probationarySegmentSize) {
      this.probationarySegment.pop();
    }
  }

  search(key) {
    let elem = this.protectedSegment.find((elem) => elem.key === key);
    if (elem) {
      return elem;
    }

    elem = this.probationarySegment.find((elem) => elem.key === key);
    if (elem) {
      this.moveToProtected(elem);
      return elem;
    }

    return null;
  }

  moveToProtected(elem) {
    // remove the element from the probationary segment
    this.probationarySegment.splice(this.probationarySegment.indexOf(elem), 1);

    // save the element to the protected segment
    this.protectedSegment.unshift(elem);

    if (this.protectedSegment.length > this.protectedSegmentSize) {
      // eliminate the least recent used element
      const lru = this.protectedSegment.pop();

      // and save it to the probationary segment
      this.save(lru.key, lru.value);
    }
  }

  getKeysInTheCache() {
    return [
      ...this.protectedSegment.map((elem) => elem.key),
      ...this.probationarySegment.map((elem) => elem.key),
    ];
  }

  getCacheUsage() {
    return this.cacheUsage;
  }
}

module.exports = SLRU;
