const Game = (function () {
  let _board = Array(9);
  let _turn;
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

  const _createBoard = () => {
    const _board = document.createElement("div");
    _board.classList.add("board");

    for (let i = 0; i < 9; i++) {
      const cases = document.createElement("div");
      cases.classList.add("cases");
      _board.appendChild(cases);
    }
    document.querySelector("main").appendChild(_board);
  };

  const replay = () => {};

  const endGame = () => {
    document.querySelector(".board").remove();
  };

  changeTurn = () => {
    _turn.getName === _P1.getName ? (_turn = _P2) : (_turn = _P1);
    _turnDisplay.textContent = _turn.getName();
  };
  const checkWin = (mark) => {
    const isMarked = (currentValue) => _board[currentValue] === mark;

    _pos.map((cases) => {
      if (cases.every(isMarked)) {
        alert(`${_turn.getName()}`);
        endGame();
      }
    });
  };
  const _round = (e) => {
    const curr = _turn.getSign();

    if (e.target.textContent !== "") return;

    const i = Array.from(e.target.parentNode.childNodes).indexOf(e.target);
    _turn.makeMove(e, i, _board);

    checkWin(curr);

    changeTurn();
  };

  const _addEvent = () => {
    const cases = document.querySelectorAll(".board > *");
    cases.forEach((casee) => casee.addEventListener("click", _round));
  };

  const _Player = (name, sign) => {
    const getSign = () => sign;
    const getName = () => name;
    const makeMove = (e, i, arr) => {
      e.target.textContent = sign;
      arr[i] = sign;
    };
    return { makeMove, getName, getSign };
  };

  const _P1 = _Player("P1", "X");
  const _P2 = _Player("P2", "O");

  const _Players = [_P1, _P2];
  const _firstMove = _Players[Math.floor(Math.random() * 2)];

  _turn = _firstMove;
  _turnDisplay.textContent = _turn.getName();

  const Play = () => {
    _createBoard();
    _addEvent();
  };

  return { Play };
})();

Game.Play();
