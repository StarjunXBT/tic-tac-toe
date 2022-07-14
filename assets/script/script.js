const game = (player, board, turnMsg) => {
  this.board = board;
  this.player = player;
  this.playerMark = "X";
  this.cpuMark = "O";

  this.replay = "/";
  this.playerTurn = turnMsg;
  this.turn = [this.player, "CPU"][Math.round(Math.random())];
  this.playerTurn.textContent = this.turn;

  this.pos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const deleteBoard = () => {
    this.board.remove();
  };

  const wantToReplay = () => {
    let sign = prompt("Want to replay? Type Yes or No");

    if (sign.toLowerCase() == "no") this.board.remove();

    if (sign.toLowerCase() == "yes") {
      this.board.replaceChildren();
      createBoard();
    }
  };

  const checkWin = (mark) => {
    console.log(document.querySelectorAll(".cases"));

    const marked = (currentValue) =>
      document.querySelectorAll(".cases")[currentValue].textContent === mark;
    this.pos.forEach((cases) => {
      if (cases.every(marked)) {
        alert(`${turn} is the winner`);
        wantToReplay();
      }
    });
  };

  const Round = (e, mark, turn) => {
    e.target.textContent = mark;
    checkWin(mark);
    this.turn = turn;
    this.playerTurn.textContent = this.turn;
  };

  const addEvent = (element) => {
    element.addEventListener("click", (e) => {
      if (e.target.textContent === "X" || e.target.textContent === "O") return;

      this.turn === this.player
        ? Round(e, this.playerMark, "CPU")
        : Round(e, this.cpuMark, this.player);
    });
  };

  const createBoard = () => {
    for (let i = 0; i < 9; i++) {
      const cases = document.createElement("div");
      cases.classList.add("cases");
      addEvent(cases);
      this.board.appendChild(cases);
    }
  };

  return { createBoard };
};

const Game = game(
  "lol",
  document.querySelector(".board"),
  document.querySelector("#player")
);
Game.createBoard();
