import styled from "styled-components";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPosts,
  selectPages,
  selectIsLoadingPost,
  selectUser,
} from "../../redux/selector";
import {
  getPaginationPost,
  deletePost,
} from "../../redux/reducers/postReducer";

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
  margin-top: 19px;
  padding: 12px 22px;
  background: #eee;
`;

const PostTitle = styled.div`
  color: black;
  font-size: 24px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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

const EditButton = styled.button`
  padding: 3px 12px;
  border: solid 1px #a8a8a8;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
  font-size: 14px;
  background: none;
  outline: none;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 3px 12px;
  border: solid 1px #a8a8a8;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
  font-size: 14px;
  margin-left: 5px;
  background: none;
  outline: none;
  cursor: pointer;
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

const Post = ({ post, handleDelete, handleEditClick }) => {
  const user = useSelector(selectUser);

  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostInfo>
        <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
        {user && (
          <div>
            <EditButton onClick={() => handleEditClick(post.id)}>
              編輯
            </EditButton>
            <DeleteButton onClick={() => handleDelete(post.id)}>
              刪除
            </DeleteButton>
          </div>
        )}
      </PostInfo>
      <PostBody>{post.body}</PostBody>
      <ReadMore to={`/post/${post.id}`}>READ MORE</ReadMore>
    </PostContainer>
  );
};

const HomePage = () => {
  const history = useHistory();
  const posts = useSelector(selectPosts);
  const pages = useSelector(selectPages);
  const isLoading = useSelector(selectIsLoadingPost);
  const limit = 5;
  const dispatch = useDispatch();

  const handlePageClick = (page) => {
    dispatch(getPaginationPost(page, limit));
  };

  const handleEditClick = (id) => {
    history.push(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    dispatch(getPaginationPost(1, limit));
  }, [dispatch]);

  return (
    <Root>
      {!isLoading && posts ? (
        <>
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              handleDelete={handleDelete}
              handleEditClick={handleEditClick}
            />
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
