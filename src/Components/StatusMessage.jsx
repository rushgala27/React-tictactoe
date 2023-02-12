import React from 'react';

const StatusMessage = ({ winner, current }) => {
  //   const message = winner
  //     ? `Winner is ${winner}`
  //     : draw
  //     ? `Its a Tie!`
  //     : `Next player is ${current.isNext ? 'X' : 'O'}`;
  const noMovesLeft = current.board.every(elem => elem !== null);
  return (
    <div className="status-message">
      {winner && (
        <>
          Winner is{' '}
          <span className={winner === 'X' ? 'text-green' : 'text-orange'}>
            {winner}
          </span>
        </>
      )}
      {!winner && !noMovesLeft && (
        <>
          Next player is{' '}
          <span className={current.isNext ? 'text-green' : 'text-orange'}>
            {current.isNext ? 'X' : 'O'}
          </span>
        </>
      )}
      {!winner && noMovesLeft && (
        <>
          <span className="text-green">X</span> and{' '}
          <span className="text-orange">O</span> tied!
        </>
      )}
    </div>
  );
};

export default StatusMessage;
