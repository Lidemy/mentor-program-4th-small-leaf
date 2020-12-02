import { getAuthToken } from "./utils";

const BASE_URL = `https://student-json-api.lidemy.me`;

const getPosts = () => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then((res) =>
    res.json()
  );
};

const getPost = (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}`).then((res) => res.json());
};

const getPaginationPost = (page) => {
  return fetch(
    `${BASE_URL}/posts?_page=${page}&_limit=5&_sort=createdAt&_order=desc`
  ).then((res) => res.json());
};

const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

const register = (username, nickname, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

const getMe = () => {
  const token = getAuthToken();

  return fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const addPost = (title, body) => {
  const token = getAuthToken();

  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};

export {
  getPosts,
  getPost,
  getPaginationPost,
  register,
  login,
  getMe,
  addPost,
};
