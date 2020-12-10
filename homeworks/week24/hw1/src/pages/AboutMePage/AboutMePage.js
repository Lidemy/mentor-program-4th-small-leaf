import styled from "styled-components";
import logo from "../../img/LOGO.png";

const Wrap = styled.div`
  margin: 30px auto;
  position: relative;
  width: 900px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;
const Banner = styled.div`
  position: relative;
  background: url(https://i.imgur.com/b0S7pGV.gif) center top no-repeat;
  background-size: cover;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;

  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;
const AboutMe = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding-top: 60px;

  img {
    width: 100px;
    height: 100px;
  }
`;

const Name = styled.div`
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  color: white;
`;
const Intro = styled.div`
  padding: 30px 50px;
  color: white;
  font-weight: bold;
`;

const AboutPage = () => {
  return (
    <Wrap>
      <Banner>
        <AboutMe>
          <img src={logo} alt="logo" />
          <Name>small_leaf</Name>
          <Intro>明知此花終將謝，然亦迷戀難自拔</Intro>
        </AboutMe>
      </Banner>
    </Wrap>
  );
};

export default AboutPage;
