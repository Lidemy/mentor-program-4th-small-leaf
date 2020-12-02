import styled from 'styled-components';
import TodosBlock from './TodosBlock';
import logo from '../../img/LOGO.png';

const TodoWrap = styled.div`
  max-width: 600px;
  min-height: 500px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 100px auto;
  overflow: hidden;
`;

const TodoBanner = styled.div`
  position: relative;
  background: url('https://i.pinimg.com/originals/9f/e0/18/9fe018c00aefa4642685e68a3207eaca.gif')
    no-repeat center bottom;
  background-size: cover;
  height: 300px;

  &:after {
    content: '';
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  h1 {
    position: relative;
    display: inline-block;
    z-index: 2;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    letter-spacing: 7px;
    font-size: 50px;
    font-family: auto;
  }
`;

const Footer = styled.footer`
  position: relative;
  background: url('https://i.pinimg.com/originals/9f/e0/18/9fe018c00aefa4642685e68a3207eaca.gif')
    no-repeat bottom;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  background-size: cover;

  &:after {
    content: '';
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  div {
    position: relative;
    z-index: 2;
    text-align: center;
    line-height: 50px;
    color: white;
    font-family: auto;
  }

  img {
    position: relative;
    top: 7px;
    margin-left: 15px;
    height: 30px;
  }
`;

const TodoFooter = () => {
  return (
    <Footer>
      <div>
        made by small-leaf
        <img src={logo} alt="logo" />
      </div>
    </Footer>
  );
};

const TodoHeader = () => {
  return (
    <TodoBanner>
      <h1>Todo List</h1>
    </TodoBanner>
  );
};

const TodoList = () => {
  return (
    <TodoWrap>
      <TodoHeader />
      <TodosBlock />
      <TodoFooter />
    </TodoWrap>
  );
};

export default TodoList;
