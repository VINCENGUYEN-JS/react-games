import * as React from "react";
import "./App.css";

const EMPTY_BOARD = [...Array(9)].map(() => 0);

function App() {
  const [board, setBoard] = React.useState(EMPTY_BOARD);
  const [player, setPlayer] = React.useState(1);

  const tick = (index) => {
    setPlayer(3 - player);
    setBoard([...board.slice(0, index), player, ...board.slice(index + 1)]);
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
