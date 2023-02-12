import React from 'react';
import Board from './Components/Board';
import { useState } from 'react';
import './styles/root.scss';
import calculateWinner from './helper';
import History from './Components/History';
import StatusMessage from './Components/StatusMessage';

const NEW_GAME = [
  {
    board: Array(9).fill(null),
    isNext: true,
  },
];

const App = () => {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove];

  const { winner, winningSquares } = calculateWinner(current.board);
  const draw = currentMove === 9;

  const handleSquareClick = position => {
    if (current.board[position] || winner) {
      return;
    }
    setHistory(currentBoard => {
      const last = currentBoard[currentBoard.length - 1];
      const newBoard = last.board.map((squareValue, pos) => {
        if (position === pos) {
          return last.isNext ? 'X' : 'O';
        }
        return squareValue;
      });
      return currentBoard.concat({
        board: newBoard,
        isNext: !last.isNext,
      });
    });

    setCurrentMove(prev => prev + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const StartNewGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TAC</span> TOE
      </h1>
      <StatusMessage winner={winner} current={current} />
      <Board
        board={current.board}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        onClick={StartNewGame}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        Start New Game
      </button>
      <h2 style={{ fontWeight: 'normal' }}>Current Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls" />
    </div>
  );
};

export default App;
