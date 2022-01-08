import React, { useEffect, useState } from 'react';
import Board from './Board';
import PrevMoveBtn from './PrevMoveBtn';
import ResetBtn from './ResetBtn';

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
    const [stepNumber, setStepNumber] = useState(0);


    const winner = calculateWinner(squares);
    let status;

    const moves = history.map((step, move) => {
        const desc = move ?
          'Перейти к ходу №' + move :
          'К началу игры';
        return (
          <li key={move}>
            <button className='actBtn' onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
    });

    if (winner) {
        status = 'Winner is - ' + (winner);
    } else {
        status = 'Next player is - ' + (xIsNext ? "X" : "O");
    }

    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }    

    useEffect(() => {
        setXIsNext(!xIsNext);
        setHistory(old => [...old, {squares: squares}]);
        setStepNumber(history.length);
    }, [squares]);

    function updateSquares(i) {
        const currentMove = history[stepNumber];
        const currentSquares = currentMove.squares.slice(0, stepNumber + 1);
        if (winner) {
            return;
        }
        currentSquares[i] = xIsNext ? "X" : "O";
        setSquares(currentSquares);
    }

    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares = {squares}
                    onClick = {updateSquares}
                    status = {status}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            <div className="game__buttons-row">
                <PrevMoveBtn />
                <ResetBtn />
            </div>
        </div>
    );
};

export default Game;