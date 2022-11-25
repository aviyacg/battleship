import Ship from './ship';

export default class Gameboard {
  constructor(gridSize = 20) {
    this.missedAttacks = [];
    this.hits = [];
    this.ships = [];
    this.gridSize = gridSize;
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
      if (vertical) {
        coordinates.push({ x, y: y + i });
      } else {
        coordinates.push({ x: x + i, y });
      }
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

    // check if attack hit a ship
    let isHit = false;
    this.ships.forEach((ship) => {
      if (ship.coordinates.some(
        (coordinate) => JSON.stringify(coordinate) === JSON.stringify({ x, y }),
      )) {
        ship.ship.hit();
        isHit = true;
      }
    });

    // push coordinates to the right list
    if (isHit) {
      this.hits.push({ x, y });
    } else {
      this.missedAttacks.push({ x, y });
    }

    return isHit;
  }

  isAllSunk() {
    return this.ships.reduce((isAllSunk, ship) => isAllSunk && ship.ship.isSunk(), true);
  }
}
