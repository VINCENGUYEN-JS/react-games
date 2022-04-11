import * as React from "react";
import "./App.css";

const EMPTY_BOARD = [...Array(9)].map(() => 0);

const WINNING_STATES = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],

  [1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1],

  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0],
];

//Complexity 0(n2)
const conditionToWin = (values, pattern) => {
  for (let i = 0; i < 9; i++) {
    // 0 && !1 => true
    if (pattern[i] && !values[i]) {
      return false;
    }
  }
  return true;
};

function App() {
  const [board, setBoard] = React.useState(EMPTY_BOARD);
  const [player, setPlayer] = React.useState(1);
  const [winningPlayer, setWinningPlayer] = React.useState(false);

  const tick = (index) => {
    const newBoard = [
      ...board.slice(0, index),
      player,
      ...board.slice(index + 1),
    ];
    setPlayer(3 - player);
    setBoard(newBoard);
    const boardValues = newBoard.map((cell) => cell === player);
    const isWinning = WINNING_STATES.find((pattern) =>
      conditionToWin(boardValues, pattern)
    );
    console.log({ isWinning, boardValues });
    if (isWinning) {
      setWinningPlayer(winningPlayer);
      alert(`player ${player} win`);
      reset();
    }
  };

  const reset = () => {
    setBoard(EMPTY_BOARD);
    setPlayer(1);
  };

  return (
    <>
      <header>
        <div className={"player " + (player === 1 ? "active" : "")}>
          <strong>Player 1 : X</strong>
        </div>
        <div className={"player " + (player === 2 ? "active" : "")}>
          <strong>Player 2 : 0</strong>
        </div>
      </header>
      <main>
        <div className="board">
          {board.map((cell, idx) => (
            <button key={idx} onClick={() => tick(idx)} disabled={cell !== 0}>
              {cell === 0 ? "" : cell === 1 ? "x" : "o"}
            </button>
          ))}
        </div>
      </main>
      <footer>
        <button type="reset" onClick={reset}>
          Reset Game
        </button>
      </footer>
    </>
  );
}

export default App;
