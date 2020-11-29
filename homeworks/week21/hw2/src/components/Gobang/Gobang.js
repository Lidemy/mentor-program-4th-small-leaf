import styled from "styled-components";
import GlobalStyle from "../../constants/style";
import Board from "./Board";
import useBoard from "./useBoard";

const Wrap = styled.div``;

const Status = styled.div`
  div {
    position: fixed;
    bottom: 0;
    left: 0;
    color: black;
    font-size: 20px;
    padding: 10px;
  }
`;

const Title = styled.h1`
  margin-top: 20px;
  text-align: center;
  color: black;
`;

const Reset = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background-color: transparent;
    border-radius: 5px;
    padding: 10px;
    border: solid 1px white;
    color: white;
    font-size: 22px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      transform: scale(1.1);
      background-color: black;
      transition: background-color 0.2s, transform 0.2s;
    }
  }
`;

const Gobang = () => {
  const { board, winner, status, handleClickSquare } = useBoard();
  return (
    <Wrap>
      <GlobalStyle />
      <Title>五子棋</Title>
      <Board board={board} handleClickSquare={handleClickSquare} />
      <Status>
        <div>{status}</div>
      </Status>
      {winner && (
        <Reset>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </Reset>
      )}
    </Wrap>
  );
};

export default Gobang;
