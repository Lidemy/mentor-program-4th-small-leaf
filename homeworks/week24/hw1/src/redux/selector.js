const selectPost = (store) => store.posts.post;
const selectPosts = (store) => store.posts.posts;
const selectPages = (store) => store.posts.pages;
const selectIsLoadingPost = (store) => store.posts.isLoadingPost;
const selectPostErrorMessage = (store) => store.posts.errorMessage;
const selectUser = (store) => store.user.user;
const selectIsLoadingAuth = (store) => store.user.isLoadingAuth;
const selectAuthErrorMessage = (store) => store.user.errorMessage;

export {
  selectPost,
  selectPosts,
  selectPages,
  selectIsLoadingPost,
  selectPostErrorMessage,
  selectUser,
  selectIsLoadingAuth,
  selectAuthErrorMessage,
};
