// A third-party API that we're using has a paginated API. It returns results in chunks of count C. The API method is called fetch_page and returns:

// {
//   "results": [...],
//   "nextpage": 3
// }

// @ts-ignore
const expect = require('chai').expect;

type ResponseAPI = {
  results: number[];
  nextPage: number;
}

class PaginatedAPI {
  data: number[];
  count: number;

  constructor(count: number) {
    this.data = [0,1,2,3];
    this.count = count;
  }

  fetch_page(nextPage: number): ResponseAPI {
    const results = this.data.slice(this.count * nextPage, this.count * (nextPage + 1));
    const itemsLeft = this.data.length - this.count * (nextPage + 1) > 0;
    return {
      results,
      nextPage: itemsLeft ? nextPage + 1 : 0,
    }
  }
}

class Wrapper {
  api: PaginatedAPI;
  lastIndex: number;
  count: number;
  nextPage: number;

  constructor() {
    this.lastIndex = 0;
    this.count = -1;
    this.nextPage = 0;
  }

  fetch(count: number) {
    if (this.nextPage === -1) return [];
    let startIndex = 0;
    let nextPage = this.nextPage;
    if (this.count !== count) {
      this.api = new PaginatedAPI(count);
      this.count = count;
      nextPage = Math.floor(this.lastIndex / count);
      startIndex = this.lastIndex ? (this.lastIndex + 1) % count : 0;
    }
    const response: ResponseAPI = this.api.fetch_page(nextPage);
    if (!response.nextPage) {
      this.nextPage = -1;
    } else {
      this.nextPage = response.nextPage;
    }
    this.lastIndex = this.count * (nextPage + 1) - 1;
    return response.results.slice(startIndex);
  }
}

const wrapper = new Wrapper();

let result = [...wrapper.fetch(3), ...wrapper.fetch(2)];

expect(result.length).to.equal(4);
