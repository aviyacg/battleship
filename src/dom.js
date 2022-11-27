export function initBoard(gridSize, element) {
  element.replaceChildren();
  for (let y = 0; y < gridSize; y += 1) {
    for (let x = 0; x < gridSize; x += 1) {
      const div = document.createElement('div');
      div.classList.add('square');
      div.dataset.x = x;
      div.dataset.y = y;
      element.appendChild(div);
    }
  }
}

export function renderBoard(gameboard, element, visibleShips = true) {
  gameboard.missedAttacks.forEach((coordinate) => {
    element.querySelector(`[data-x="${coordinate.x}"][data-y="${coordinate.y}"]`).classList.add('missed-attack');
  });
  gameboard.hits.forEach((coordinate) => {
    element.querySelector(`[data-x="${coordinate.x}"][data-y="${coordinate.y}"]`).classList.add('hit');
  });
  if (visibleShips) {
    gameboard.ships.forEach((ship) => {
      ship.coordinates.forEach((coordinate) => {
        element.querySelector(`[data-x="${coordinate.x}"][data-y="${coordinate.y}"]`).classList.add('ship');
      });
    });
  }
}
