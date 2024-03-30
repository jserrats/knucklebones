import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function State({ turn, diceValue }) {
  return (
    <h2>It is player {turn ? 'A' : 'B'} turn, you have to place a {diceValue}</h2>
  );
}

function PlayerBoard({ player, squares, handleClick }) {

  let score = 0;

  for (let k = 0; k < 3; k++) {
    // generating the row array and removing null values
    const row = squares.slice(3 * k, 3 + 3 * k).filter(Number);
    // for each possible value (in a dice)
    for (let i = 1; i <= 6; i++) {
      let appearances = 0;
      // for each of the three squares in the row count appearances
      for (let j = 0; j < 3; j++) {
        if (row[j] == i) { appearances++; }
      }
      console.log(player, row, appearances, score);
      score = score + i * appearances ** 2;
    }
  }

  return (
    <>
      <h2>{player}'s score: {score}</h2>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(player, 0)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(player, 3)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(player, 6)} />
      </div>
      <div className="board-row">
        <Square value={squares[1]} onSquareClick={() => handleClick(player, 1)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(player, 4)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(player, 7)} />
      </div>
      <div className="board-row">
        <Square value={squares[2]} onSquareClick={() => handleClick(player, 2)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(player, 5)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(player, 8)} />
      </div>
    </>
  );
}
export default function GameBoard() {
  const [AplayerIsNext, setAplayerIsNext] = useState(true);
  const [board, setBoard] = useState({ "a": Array(9).fill(null), "b": Array(9).fill(null) });
  const [dice, setDice] = useState(rollDice())

  function handleTurn(player, i) {
    if (player == getPlayerTurn() && board[player][i] == null) {
      let nextBoard = { "a": board["a"].slice(), "b": board["b"].slice() };
      nextBoard[player][i] = dice;
      nextBoard = deleteEnemySquares(player, i, nextBoard);
      setBoard(nextBoard);
      nextTurn();
      setDice(rollDice());
    }
  }

  function deleteEnemySquares(player, i, nextBoard) {
    // obtain the opposite player name
    const enemyPlayer = player != 'a' ? 'a' : 'b';
    // get the row number that is being played
    const rowNumber = Math.floor(i / 3);

    // iterate over the enemy player row to find matches, and if found set to null
    [0 + 3 * rowNumber, 1 + 3 * rowNumber, 2 + 3 * rowNumber].forEach((j) => {
      if (nextBoard[enemyPlayer][j] == dice) {
        nextBoard[enemyPlayer][j] = null;
      }
    })
    return nextBoard;
  }

  function nextTurn() {
    setAplayerIsNext(!AplayerIsNext);
  }

  function getPlayerTurn() {
    return AplayerIsNext ? 'a' : 'b';
  }

  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  return (
    <>
      <h1>Knucklebones</h1>
      <h3>Inspired by the minigame in <a href="https://store.steampowered.com/app/1313140/Cult_of_the_Lamb/">Cult of the Lamb</a>  </h3>
      <State turn={AplayerIsNext} diceValue={dice} />
      <div className="game-row">
        <PlayerBoard player="a" squares={board["a"]} handleClick={handleTurn} />
      </div>
      <br></br>
      <div className="game-row">
        <PlayerBoard player="b" squares={board["b"]} handleClick={handleTurn} />
      </div>
    </>
  );

}



