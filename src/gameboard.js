import Ship from './ship';

export default class Gameboard {
  constructor(gridSize = 20) {
    this.missedAttacks = [];
    this.hits = [];
    this.ships = [];
    this.gridSize = gridSize;
  }

  /**
   * Get a ship by coordinates
   * @param {number} x x coordinate
   * @param {number} y y coordinate
   * @returns the ship that occupies the coordinate otherwise return undefined
   */
  getShip(x, y) {
    const foundShip = this.ships.find((ship) => ship.coordinates.some(
      (coordinate) => JSON.stringify(coordinate) === JSON.stringify({ x, y }),
    ));
    return foundShip ? foundShip.ship : undefined;
  }

  placeShip(x, y, length, vertical = false) {
    // validate ship location
    if (x < 0 || x >= this.gridSize
      || y < 0 || y >= this.gridSize) {
      return false;
    }
    if ((vertical && y + length >= this.gridSize)
    || (!vertical && x + length >= this.gridSize)) {
      return false;
    }
    // create ship and coordinates list
    const ship = new Ship(length);
    const coordinates = [];
    for (let i = 0; i < length; i += 1) {
      let coordinate;
      if (vertical) {
        coordinate = { x, y: y + i };
      } else {
        coordinate = { x: x + i, y };
      }
      // check if coordinate is occupied by another ship
      if (this.getShip(coordinate.x, coordinate.y)) {
        return false;
      }
      coordinates.push(coordinate);
    }
    // append to list
    this.ships.push({ ship, coordinates });
    return true;
  }

  recieveAttack(x, y) {
    // validate coordinates
    if (x < 0 || x >= this.gridSize
      || y < 0 || y >= this.gridSize) {
      return undefined;
    }

    // check if coordinate was attacked before
    if (this.missedAttacks.concat(this.hits).some(
      (coordinate) => JSON.stringify(coordinate) === JSON.stringify({ x, y }),
    )) {
      return false;
    }

    // check if attack hit a ship & push coordinate to the right list
    const attackedShip = this.getShip(x, y);
    if (attackedShip) {
      attackedShip.hit();
      this.hits.push({ x, y });
      return true;
    }
    this.missedAttacks.push({ x, y });
    return false;
  }

  isAllSunk() {
    return this.ships.reduce((isAllSunk, ship) => isAllSunk && ship.ship.isSunk(), true);
  }
}
