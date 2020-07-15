const request = require('request');

const baseUrl = 'https://lidemy-book-store.herokuapp.com';
request(`${baseUrl}/books?_limit=10`, (err, res, body) => {
  if (err) {
    return console.log('選取失敗', err);
  }
  const data = JSON.parse(body);
  for (let i = 0; i < data.length; i += 1) {
    console.log(`${data[i].id} ${data[i].name}`);
  }
});
