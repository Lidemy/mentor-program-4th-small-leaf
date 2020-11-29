import React, { useState } from "react";
import calculateWinner from "./calculateWinner";

const useBoard = () => {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));

  const [isBlack, setIsBlack] = useState(true);

  const winner = calculateWinner(board);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isBlack ? "Black" : "White"}`;
  }

  const updateBoard = (y, x, newBoard) => {
    setBoard(
      board.map((row, currentY) => {
        if (currentY !== y) return row;
        return row.map((col, currentX) => {
          if (currentX !== x) return col;
          return newBoard;
        });
      })
    );
  };

  const handleClickSquare = (y, x) => {
    return () => {
      console.log(board[y][x]);
      if (calculateWinner(board) || board[y][x]) {
        return;
      }
      updateBoard(y, x, isBlack ? "Black" : "White");
      setIsBlack(!isBlack);
    };
  };

  return {
    board,
    setBoard,
    isBlack,
    setIsBlack,
    winner,
    status,
    handleClickSquare,
  };
};

export default useBoard;
