/*
* Least frequent recently used cache policy
* Own implementation and is optimized for array usage
*
* Description:
* The Least Frequent Recently Used (LFRU) cache replacement scheme combines
* the benefits of LFU and LRU schemes. LFRU is suitable for ‘in network’ cache applications,
* such as Information-centric networking (ICN), Content Delivery Networks (CDNs) and distributed networks in general.
* In LFRU, the cache is divided into two partitions called privileged and unprivileged partitions.
* The privileged partition can be defined as a protected partition.
* If content is highly popular, it is pushed into the privileged partition.
* Replacement of the privileged partition is done as follows:
* LFRU evicts content from the unprivileged partition,
* pushes content from privileged partition to unprivileged partition,
* and finally inserts new content into the privileged partition.
* In the above procedure the LRU is used for the privileged partition and
* an approximated LFU (ALFU) scheme is used for the unprivileged partition,
* hence the abbreviation LFRU.
* The basic idea is to filter out the locally popular contents with ALFU scheme and push the popular contents to one of the privileged partition.
*/

class DB {
  get(key) {
    return Math.random() * 10 * key;
  }
}

class Element {
  constructor(key = null, value = null) {
    this.isPrivileged = true;
    this.key = key;
    this.value = value;
    this.lastTimeUsed = Date.now();
    this.popularity = 0; // times element was used
  }
}

class LFRU {
  constructor() {
    this.db = new DB();
    this.cache = [];
    this.privilegedItems = 0;
    this.unPrivilegedItems = 0;
    this.privilegedQueueSize = 4;
    this.unPrivilegedQueueSize = 4;
    this.cacheUsage = 0;
  }

  get(key) {
    // try to find the key in the cache
    const elem = this.search(key);
    if (elem) {
      this.cacheUsage += 1;
      return elem;
    }

    // if there is no value, get it from database and save it to the cache
    const value = this.db.get(key);
    this.save(new Element(key, value));
  }

  search(key) {
    let elem = this.cache.find((elem) => elem && elem.key === key);

    if (elem) {
      elem.lastTimeUsed = Date.now();
      elem.popularity += 1;
    }

    return elem || null;
  }

  /* This method saves the element to privileged queue with LRU algorithm
  * and moves queue forward to unprivileged status with LFU algorithm
  */
  save(elem) {
    // So far as privileged (LRU) displaces unprivileged (LFU) and the LFU element will gone,
    // we put the new element to LFU place and LRU just becomes unprivileged

    if (this.privilegedItems < this.privilegedQueueSize) {
      this.cache.push(elem);
      this.privilegedItems += 1;
    } else if (this.unPrivilegedItems < this.unPrivilegedQueueSize) {
      this.cache.push(elem);
      this.cache[this.getLRUIndex()].isPrivileged = false;
      this.unPrivilegedItems += 1;
    } else {
      const LFU = this.getLFUIndex();
      this.cache[this.getLRUIndex()].isPrivileged = false;
      this.cache[LFU] = elem;
    }
  }

  getLRUIndex() {
    let LRU = new Element();
    LRU.lastTimeUsed = Date.now() + 1000;
    let LRUIndex = -1;

    for (let i = 0; i < this.cache.length; i += 1) {
      if (this.cache[i].isPrivileged && this.cache[i].lastTimeUsed < LRU.lastTimeUsed) {
        LRU = this.cache[i];
        LRUIndex = i;
      }
    }
    return LRUIndex;
  }

  getLFUIndex() {
    let LFU = new Element();
    LFU.popularity = Number.MAX_VALUE;
    let LFUIndex = -1;

    for (let i = 0; i < this.cache.length; i += 1) {
      if (this.cache[i] && !this.cache[i].isPrivileged && this.cache[i].popularity < LFU.popularity) {
        LFU = this.cache[i];
        LFUIndex = i;
      }
    }
    return LFUIndex;
  }

  getKeysInTheCache() {
    return this.cache.map((elem) => elem.key);
  }

  getCacheUsage() {
    return this.cacheUsage;
  }
}

module.exports = LFRU;
