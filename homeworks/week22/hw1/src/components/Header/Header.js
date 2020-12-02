import styled from "styled-components";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";
import { Link, useLocation, useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0 32px;
  box-sizing: border-box;
  background: white;
  z-index: 2;
`;

const Brand = styled(Link)`
  font-size: 32px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`;

const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 64px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  ${(props) => props.$active && `background: rgba(0, 0, 0, 0.2)`}
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${NavbarList} {
    margin-left: 30px;
  }
`;

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") {
      history.push("/");
    }
  };
  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand to="/">Blog</Brand>
        <NavbarList>
          <Nav to="/" $active={location.pathname === "/"}>
            首頁
          </Nav>
          <Nav to="/post-list" $active={location.pathname === "/post-list"}>
            文章列表
          </Nav>
          <Nav to="/about-me" $active={location.pathname === "/about-me"}>
            關於我
          </Nav>
        </NavbarList>
      </LeftContainer>
      <NavbarList>
        {!user && (
          <>
            <Nav to="/login" $active={location.pathname === "/login"}>
              登入
            </Nav>
            <Nav to="/register" $active={location.pathname === "/register"}>
              註冊
            </Nav>
          </>
        )}
        {user && (
          <Nav to="/new-post" $active={location.pathname === "/new-post"}>
            發布文章
          </Nav>
        )}
        {user && <Nav onClick={handleLogout}>登出</Nav>}
      </NavbarList>
    </HeaderContainer>
  );
}

export default Header;
