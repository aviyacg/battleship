import Gameboard from './gameboard';

function getRandomCoordinate(boardSize) {
  const x = Math.floor(Math.random() * boardSize);
  const y = Math.floor(Math.random() * boardSize);
  return { x, y };
}

function getRandomBool() {
  const n = parseFloat(Math.random().toFixed(2)) * 100;
  return n > 50;
}

export default function newGame() {
  // create player board
  const player = new Gameboard(15);
  // place 5 ships on the board
  for (let i = 0; i < 5; i += 1) {
    let coordinate = getRandomCoordinate(player.gridSize);
    while (!player.placeShip(coordinate.x, coordinate.y, i + 2, getRandomBool())) {
      coordinate = getRandomCoordinate(player.gridSize);
    }
  }

  // create computer board
  const computer = new Gameboard(15);
  // place 5 ships on the board
  for (let i = 0; i < 5; i += 1) {
    let coordinate = getRandomCoordinate(computer.gridSize);
    while (!computer.placeShip(coordinate.x, coordinate.y, i + 2, getRandomBool())) {
      coordinate = getRandomCoordinate(computer.gridSize);
    }
  }

  return { player, computer };
}
