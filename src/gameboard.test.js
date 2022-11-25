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
