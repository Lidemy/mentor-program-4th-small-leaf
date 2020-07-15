const request = require('request');
const process = require('process');

const baseUrl = 'https://restcountries.eu/rest/v2';
const args = process.argv;
const name = args[2];

if (!name) {
	return console.log('輸入國家名稱');
}

request(`${baseUrl}/name/${name}`, (err, res, body) => {
if (err) {
    return console.log('抓取失敗');
  }
  const obj = JSON.parse(body)
  if (obj.status === 404) {
    return console.log('找不到國家資訊');
  }

  for (let i = 0; i < obj.length; i++) {
    console.log('============')
    console.log(`國家:${obj[i].name}`);
    console.log(`首都:${obj[i].capital}`);
    console.log(`貨幣:${obj[i].currencies[0].code}`);
    console.log(`國碼:${obj[i].callingCodes[0]}`);
}
})
