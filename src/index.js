import { initBoard, renderBoard } from './dom';
import { newGame, getComputerMove } from './game';

import './style.css';

console.log('Hello World!');

const playerBoard = document.querySelector('.defence-board');
const computerBoard = document.querySelector('.attack-board');

const { player, computer } = newGame();

initBoard(player.gridSize, playerBoard);
initBoard(computer.gridSize, computerBoard);

computerBoard.querySelectorAll('.square').forEach(
  (square) => square.addEventListener('click', (event) => {
    let { x, y } = event.target.dataset;
    x = parseInt(x);
    y = parseInt(y);
    computer.recieveAttack(x, y);
    renderBoard(computer, computerBoard, false);

    if (!computer.isAllSunk()) {
      getComputerMove(player);
      renderBoard(player, playerBoard);
    }
  }),
);

renderBoard(player, playerBoard);
renderBoard(computer, computerBoard, false);
