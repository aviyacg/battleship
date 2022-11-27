import { initBoard, renderBoard } from './dom';
import newGame from './game';

import './style.css';

console.log('Hello World!');

const playerBoard = document.querySelector('.defence-board');
const computerBoard = document.querySelector('.attack-board');

const { player, computer } = newGame();

initBoard(player.gridSize, playerBoard);
initBoard(computer.gridSize, computerBoard);
renderBoard(player, playerBoard);
renderBoard(computer, computerBoard, false);
