const request = require('request');
const process = require('process');

const baseUrl = 'https://lidemy-book-store.herokuapp.com';
const args = process.argv;
const action = args[2];
const params = args[3];

switch (action) {
  case 'list':
    listBook();
    break;
  case 'read':
    readBook(params);
    break;
  case 'delete':
    deleteBook(params);
    break;
  case 'create':
    creatBook(params);
    break;
  case 'update':
    updateBook(params, args[4]);
    break;
}


function listBook() {
  request(
    `${baseUrl}/books?_limit=20`, (err, res, body) => {
      if (err) {
        return console.log('抓取失敗', err);
      }
      const obj = JSON.parse(body);
      obj.map(ele => console.log(`${ele.id} ${ele.name}`));
    });
}

function readBook(id) {
  request(
    `${baseUrl}/books/${id}`, (err, res, body) => {
      if (err) {
        return console.log('抓取失敗', err);
      }
      const obj = JSON.parse(body);
      console.log(obj);
    });
}

function deleteBook(id) {
  request.delete(
    `${baseUrl}/books/${id}`, (err, res, body) => {
      if (err) {
        return console.log('抓取失敗', err);
      }
      console.log('刪除成功!');
    });
}

function creatBook(name) {
  request.post({
    url: `${baseUrl}/books`,
    form: {
      name,
    },
  }, (err, res, body) => {
    if (err) {
      return console.log('新增失敗', err);
    }
    console.log('新增成功!');
  });
}

function updateBook(id, name) {
  request.patch({
    url: `${baseUrl}/books/${id}`,
    form: {
      name,
    },
  }, (err, res, body) => {
    if (err) {
      return console.log('更新失敗', err);
    }
    console.log('更新成功');
  });
}
