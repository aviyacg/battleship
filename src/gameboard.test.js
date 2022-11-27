import Gameboard from './gameboard';
import Ship from './ship';

test('placeShip return true when successful', () => {
  const gameboard = new Gameboard();
  expect(gameboard.placeShip(2, 2, 3)).toBeTruthy();
});

test('placeShip return false when fail', () => {
  const gameboard = new Gameboard();
  expect(gameboard.placeShip(19, 5, 3)).toBeFalsy();
});

test('placeShip vertically return true when successful', () => {
  const gameboard = new Gameboard();
  expect(gameboard.placeShip(18, 2, 3, true)).toBeTruthy();
});

test('placeShip vertically return alse when fail', () => {
  const gameboard = new Gameboard();
  expect(gameboard.placeShip(8, 18, 5, true)).toBeFalsy();
});

test('placeShip create a ship object', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(5, 5, 5);
  expect(gameboard.ships[0].ship).toBeInstanceOf(Ship);
  expect(gameboard.ships[0].ship.isSunk).toBeTruthy();
});

test('placeShip create the correct coordinate list', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(5, 5, 3);
  expect(gameboard.ships[0].coordinates).toEqual(
    [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }],
  );
});

test('placeShip vertically create the correct coordinate list', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(5, 5, 3, true);
  expect(gameboard.ships[0].coordinates).toEqual(
    [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 }],
  );
});

test('recieveAttack coordinates validation', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 4);
  expect(gameboard.recieveAttack(20, 0)).toBeUndefined();
  expect(gameboard.recieveAttack(0, -3)).toBeUndefined();
  expect(gameboard.recieveAttack(0, 5)).toBeDefined();
});

test('recieveAttack return true when hits a ship', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 4);
  expect(gameboard.recieveAttack(0, 0)).toBeTruthy();
});

test('recieveAttack hits the ship', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 4);
  gameboard.recieveAttack(2, 0);
  expect(gameboard.ships[0].ship.hits).toBe(1);
});

test('recieveAttack push coordinates to hits list when hits a ship', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 4);
  gameboard.recieveAttack(0, 0);
  expect(gameboard.hits).toContainEqual({ x: 0, y: 0 });
});

test('recieveAttack push coordinates to the missed list when missing', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 4);
  gameboard.recieveAttack(2, 2);
  expect(gameboard.missedAttacks).toContainEqual({ x: 2, y: 2 });
});

test('recieveAttack return false when attacing the same coordinate', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 4);
  gameboard.recieveAttack(0, 0);
  expect(gameboard.recieveAttack(0, 0)).toBeFalsy();
});

test('isAllSunk return true when all ships sunk', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, 3, 2);
  gameboard.placeShip(5, 3, 2);
  [0, 1, 2, 3].forEach((num) => gameboard.recieveAttack(3 + num, 3));
  expect(gameboard.isAllSunk()).toBeTruthy();
});

test('isAllSunk return false when not all ships sunk', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, 3, 2);
  gameboard.placeShip(5, 3, 2);
  [0, 1, 2].forEach((num) => gameboard.recieveAttack(3 + num, 3));
  expect(gameboard.isAllSunk()).toBeFalsy();
});
