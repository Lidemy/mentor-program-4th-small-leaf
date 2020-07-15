const request = require('request');

const baseUrl = 'https://api.twitch.tv/kraken';
const clientId = 'ph7kfg58fkitm88sogja5xzqm4tlyp';
request.get({
  url: `${baseUrl}/games/top`,
  headers: {
    'Client-ID': clientId,
    'Accept': 'application/vnd.twitchtv.v5+json',
  },
}, (err, res, body) => {
  if (err) {
    return console.log(err);
  }
  const data = JSON.parse(body);
  const games = data.top;
  games.map(ele => {
    console.log(`${ele.viewers} ${ele.game.name}`);
  });
});
