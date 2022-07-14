const Game = (function () {
  "use strict";

  const _main = document.querySelector("main");
  const _PlayerMark = "X";
  const _CPUMark = "O";
  const _first_Turn = ["Player", "CPU"][Math.round(Math.random())];
  let _turn = _first_Turn;
  const _turnDisplay = document.querySelector("#player");

  const _pos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 7],
  ];

  // Set first turn
  _turnDisplay.textContent = _first_Turn;

  // Ask user if he want to play again
  const _wantToReplay = () => {
    const replay = prompt("What's your replay?");

    if (replay.toLowerCase() === "no") {
      document.querySelector(".board").remove();
    }

    if (replay.toLowerCase() === "yes") {
      document.querySelector(".board").remove();
      createBoard();
    }
  };

  // Check if there is a winner
  const _winner = (mark, player) => {
    const isMarked = (currentValue) =>
      document.querySelectorAll(".cases")[currentValue].textContent === mark;

    _pos.map((cases) => {
      if (cases.every(isMarked)) {
        alert(`${player} has won`);
        _wantToReplay();
      }
    });
  };

  // Play a round
  const _round = (mark, next, e) => {
    const curr = _turn;
    _turn = next;
    _turnDisplay.textContent = next;
    e.target.textContent = mark;
    _winner(mark, curr);
  };
  // Add event on board cases
  const _addEvent = (element) => {
    element.addEventListener("click", (e) => {
      if (e.target.textContent === _PlayerMark || e.target.textContent === _CPUMark) return;

      _turn === "CPU" ? _round("O", "Player", e) : _round("X", "CPU", e);
    });
  };

  // Create board and cases
  const createBoard = () => {
    const board = document.createElement("div");
    board.classList.add("board");

    for (let i = 0; i < 9; i++) {
      const cases = document.createElement("div");
      cases.classList.add("cases");
      _addEvent(cases);
      board.appendChild(cases);
    }
    _main.appendChild(board);
  };

  return {
    createBoard,
  };
})();

Game.createBoard();
