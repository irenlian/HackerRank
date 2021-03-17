//https://leetcode.com/problems/generate-random-point-in-a-circle/solution/

class Solution {
  radius;
  x_center;
  y_center;

  constructor(radius, x_center, y_center) {
    this.radius = radius;
    this.x_center = x_center;
    this.y_center = y_center;
  }

  // Algorithm: getting random X and use it for calculating the restrictions for getting random Y
  // Restrictions: non uniform distribution
  // Time complexity: O(1)
  randPointNonUniform() {
    const x = (Math.random() * this.radius * 2) + (this.x_center - this.radius);
    const maxY = Math.pow(Math.pow(this.radius, 2) - Math.pow(x - this.x_center, 2), 1/2) + this.y_center;
    const minY = 2 * this.y_center - maxY;
    const y = (Math.random() * (maxY - this.y_center) * 2) + minY;
    return [x, y];
  }

  // Time complexity: O(1) on average. O(∞) worst case.
  randPoint() {
    const minX = this.x_center - this.radius;
    const minY = this.y_center - this.radius;
    while (true) {
      const x = Math.random() * this.radius * 2 + minX;
      const y = Math.random() * this.radius * 2 + minY;
      if (Math.pow(x - this.x_center, 2) + Math.pow(y - this.y_center, 2) <= Math.pow(this.radius, 2)) {
        return [x, y];
      }
    }
  }
}

function test() {
  const radius = 10;
  const x_center = 5;
  const y_center = -7.5;

  const circle = new Solution(radius, x_center, y_center);
  while (true) {
    const point = circle.randPoint();
    if (Math.pow(point[0] - x_center, 2) + Math.pow(point[1] - y_center, 2) > Math.pow(radius, 2)) {
      console.log(point);
      break;
    }
    console.log('ok');
  }
}

test();
