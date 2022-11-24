import Ship from './ship';

test('constructor return a ship object', () => {
  expect(new Ship(5)).toBeTruthy();
});

test('constructor return undefined when given non number length', () => {
  expect(new Ship('1').length).toBe(1);
});

test('length is 1 when given non positive length', () => {
  expect(new Ship(0).length).toBe(1);
});

test('hit increment hits by 1', () => {
  const ship = new Ship(2);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test('hit doesnt increment hits of a sunked ship', () => {
  const ship = new Ship(1);
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(1);
});

test('isSunk return false when ship is not sunk', () => {
  const ship = new Ship(3);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test('isSunk return true when ship is sunk', () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
