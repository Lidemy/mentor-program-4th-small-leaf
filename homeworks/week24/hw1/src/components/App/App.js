import styled from "styled-components";
import React, { useEffect } from "react";
import {
  AboutMePage,
  AddPostPage,
  EditPostPage,
  HomePage,
  LoginPage,
  PostListPage,
  PostPage,
  RegisterPage,
} from "../../pages";
import Header from "../Header";
import { getAuthToken } from "../../utils";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { getMe } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getAuthToken()) {
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <Root>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/post-list'>
            <PostListPage />
          </Route>
          <Route path='/about-me'>
            <AboutMePage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <Route path='/post/:id'>
            <PostPage />
          </Route>
          <Route path='/new-post'>
            <AddPostPage />
          </Route>
          <Route path='/edit/:id'>
            <EditPostPage />
          </Route>
        </Switch>
      </Router>
    </Root>
  );
}

export default App;
