import styled from "styled-components";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { getPaginationPost } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPosts,
  selectIsLoadingPost,
  selectPages,
} from "../../redux/selector";

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  margin-top: 24px;

  &:last-child {
    margin-bottom: 24px;
  }
`;
const PostTitle = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 24px;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const PageContainer = styled.div`
  margin: 50px 0;
  display: flex;
  justify-content: center;
`;

const PageBtn = styled.a`
  position: relative;
  padding: 10px 20px;
  margin-left: 2px;
  color: black;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
`;

const Post = ({ post }) => {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
};

const HomePage = () => {
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoadingPost);
  const pages = useSelector(selectPages);
  const dispatch = useDispatch();
  const limit = 10;

  const handlePageClick = (page) => {
    dispatch(getPaginationPost(page, limit));
  };

  useEffect(() => {
    dispatch(getPaginationPost(1, limit));
  }, [dispatch]);

  return (
    <Root>
      {!isLoading && posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
          <PageContainer>
            {pages &&
              pages.map((page) => (
                <PageBtn key={page} onClick={() => handlePageClick(page)}>
                  {page}
                </PageBtn>
              ))}
          </PageContainer>
        </>
      ) : (
        <Spinner />
      )}
    </Root>
  );
};

export default HomePage;
