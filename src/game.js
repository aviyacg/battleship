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

export function newGame() {
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

export function getComputerMove(player) {
  // find a square adjacent to a hit
  const foundSquare = player.hits.find((coordinate) => {
    console.log(coordinate);
    const { x, y } = coordinate;
    const adjacentSquares = [{ x, y: y - 1 }, { x, y: y + 1 }, { x: x + 1, y }, { x: x - 1, y }];
    return adjacentSquares.find((square) => player.recieveAttack(square.x, square.y) !== undefined);
  });
  // pick random square
  if (foundSquare === undefined) {
    let coordinate = getRandomCoordinate(player.gridSize);
    while (player.recieveAttack(coordinate.x, coordinate.y) === undefined) {
      coordinate = getRandomCoordinate(player.gridSize);
    }
  }
}
