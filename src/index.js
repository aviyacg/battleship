import { initBoard, renderBoard } from './dom';
import { newGame, getComputerMove } from './game';

import './style.css';

const playerBoard = document.querySelector('.defence-board');
const computerBoard = document.querySelector('.attack-board');

document.querySelector('button').addEventListener('click', () => {
  // init game
  document.querySelector('button').textContent = 'New Game';
  const { player, computer } = newGame();
  initBoard(player.gridSize, playerBoard);
  initBoard(computer.gridSize, computerBoard);

  renderBoard(player, playerBoard);
  renderBoard(computer, computerBoard, false);

  // the event listener callback manage all gameplay logic
  computerBoard.querySelectorAll('.square').forEach(
    (square) => square.addEventListener('click', (event) => {
      if (player.isAllSunk() || computer.isAllSunk()) return;
      // get coordinates
      let { x, y } = event.target.dataset;
      x = parseInt(x);
      y = parseInt(y);
      // check if attack is valid
      const isValide = computer.recieveAttack(x, y);
      if (isValide !== undefined) {
        // render player move
        renderBoard(computer, computerBoard, false);
        // check if player won
        if (computer.isAllSunk()) {
          document.querySelector('button').textContent = 'You won, Play agian!';
          return;
        }
        // computer move
        getComputerMove(player);
        renderBoard(player, playerBoard);
        // check if computer won
        if (player.isAllSunk()) {
          document.querySelector('button').textContent = 'You lose, Try again!';
        }
      }
    }),
  );
});
