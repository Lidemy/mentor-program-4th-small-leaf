import styled from "styled-components";

const BoardWrap = styled.div`
  margin: 70px auto;
  width: 532px;
  height: 532px;
`;

const BoardRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Square = styled.div`
  background: #b4784f;
  border: 1px solid black;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 27px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 27px;
`;

const Cell = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${(props) => props.color};
`;

const Board = ({ board, handleClickSquare }) => {
  return (
    <BoardWrap>
      {board.map((row, y) => (
        <BoardRow key={y}>
          {row.map((_, x) => (
            <Square key={x} onClick={handleClickSquare(y, x)}>
              {board[y][x] && <Cell color={board[y][x]} />}
            </Square>
          ))}
        </BoardRow>
      ))}
    </BoardWrap>
  );
};

export default Board;
