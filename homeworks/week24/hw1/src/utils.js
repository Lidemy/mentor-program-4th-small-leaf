const TOKEN_NAME = "token";

const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

const getAuthToken = () => {
  return localStorage.getItem("token");
};

const pagination = (totalPage) => {
  const page = [];
  for (let i = 1; i <= totalPage; i++) {
    page.push(i);
  }
  return page;
};

export { setAuthToken, getAuthToken, pagination };
