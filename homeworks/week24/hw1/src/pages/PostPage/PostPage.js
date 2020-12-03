import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { getPost, setPost, deletePost } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPost,
  selectIsLoadingPost,
  selectUser,
} from "../../redux/selector";
import Spinner from "../../components/Spinner";

const PostContainer = styled.div`
  width: 80%;
  min-height: 450px;
  margin: 50px auto;
  padding: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 19px;
  padding: 12px 22px;
  background: #eee;
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

const PostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoadingPost);
  const history = useHistory();

  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => {
      history.goBack();
    });
  };

  const handleEditClick = (id) => {
    history.push(`/edit/${id}`);
  };

  useEffect(() => {
    dispatch(getPost(id));
    return () => dispatch(setPost(null));
  }, [id, dispatch]);

  return (
    <>
      {!isLoading && post ? (
        <PostContainer>
          <PostTitle>{post.title}</PostTitle>
          <PostHeader>
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
