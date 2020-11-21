import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { getPosts, getPaginationPost } from "../../WebAPI";
import { pagination } from "../../utils";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  padding: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  margin-top: 24px;
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  overflow: hidden;
  line-height: 1.5em;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ReadMore = styled(Link)`
  display: inline-block;
  padding: 12px 16px;
  border: solid 1px #737373;
  color: #737373;
  margin-top: 36px;
  text-decoration: none;
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
      <PostInfo>
        <PostTitle>{post.title}</PostTitle>
        <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      </PostInfo>
      <PostBody>{post.body}</PostBody>
      <ReadMore to={`/post/${post.id}`}>READ MORE</ReadMore>
    </PostContainer>
  );
};

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState([]);

  const handleButtonClick = (page) => {
    return () => {
      getPaginationPost(page).then((posts) => {
        setPosts(posts);
      });
    };
  };

  useEffect(() => {
    getPosts().then((posts) => {
      const totalPage = Math.ceil(posts.length / 5);
      //console.log(totalPage);
      setPages(pagination(totalPage));
      //console.log(pagination(totalPage));
      getPaginationPost(1).then((post) => setPosts(post));
    });
  }, []);

  return (
    <Root>
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
          <PageContainer>
            {pages &&
              pages.map((page) => (
                <PageBtn key={page} onClick={handleButtonClick(page)}>
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
