import styled from "styled-components";
import React, { useState } from "react";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import AboutMePage from "../../pages/AboutMePage";
import RegisterPage from "../../pages/RegisterPage";
import PostPage from "../../pages/PostPage";
import AddPostPage from "../../pages/AddPostPage";
import PostListPage from "../../pages/PostListPage";
import Header from "../Header";
import { AuthContext } from "../../contexts";
import { getMe } from "../../WebAPI";
import { getAuthToken } from "../../utils";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const [user, setUser] = useState(() => {
    const token = getAuthToken();
    if (token) {
      return getMe().then((res) => {
        if (res.ok) {
          setUser(res.data);
        }
      });
    }
    return null;
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/post-list">
              <PostListPage />
            </Route>
            <Route path="/about-me">
              <AboutMePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/post/:id">
              <PostPage />
            </Route>
            <Route path="/new-post">
              <AddPostPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
