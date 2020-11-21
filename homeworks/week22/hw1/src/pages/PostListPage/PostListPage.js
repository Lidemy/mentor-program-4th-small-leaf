import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { getPosts } from "../../WebAPI";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

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

const Post = ({ post }) => {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
};

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, []);

  return (
    <Root>
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <Spinner />
      )}
    </Root>
  );
};

export default HomePage;
