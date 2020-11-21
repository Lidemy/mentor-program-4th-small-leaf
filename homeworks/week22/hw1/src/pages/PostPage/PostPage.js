import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getPost } from "../../WebAPI";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

const PostContainer = styled.div`
  width: 80%;
  margin: 50px auto;
  padding: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostTitle = styled.div`
  color: black;
  font-size: 24px;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const PostBody = styled.div`
  margin-top: 20px;
  white-space: pre-line;
  word-break: break-word;
`;

const PostPage = () => {
  const [post, setPost] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getPost(id).then((post) => setPost(post[0]));
  }, [id]);

  return (
    <>
      {post ? (
        <PostContainer>
          <PostHeader>
            <PostTitle>{post.title}</PostTitle>
            <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
          </PostHeader>
          <PostBody>{post.body}</PostBody>
        </PostContainer>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default PostPage;
