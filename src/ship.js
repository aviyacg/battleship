export default class Ship {
  constructor(length) {
    if (typeof length === 'number' && length > 0) {
      this.length = length;
    } else {
      this.length = 1;
    }
    this.hits = 0;
  }

  hit() {
    if (!this.isSunk()) this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
