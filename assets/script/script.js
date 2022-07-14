const game = (player, board, turnMsg) => {
  this.board = board;
  this.player = player;
  this.playerMark = "X";
  this.cpuMark = "O";

  this.playerTurn = turnMsg;
  this.turn = [this.player, "CPU"][Math.round(Math.random())];
  this.playerTurn.textContent = this.turn;
  

  const Round = (e, mark, turn) => {
    checkWin();
    e.target.textContent = mark;
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
