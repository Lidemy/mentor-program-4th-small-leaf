const url = 'https://api.twitch.tv/kraken'
const accept = 'application/vnd.twitchtv.v5+json'
const clientId = 'ph7kfg58fkitm88sogja5xzqm4tlyp'
const appendHtml = `
<div class="stream">
  <img src="$preview" onload="this.style.opacity=1">
  <div class="stream__data">
    <div class="stream__avatar">
      <img src="$logo" onload="this.style.opacity=1">
    </div>
    <div class="stream__intro">
      <div class="stream__title">
        $title
      </div>
      <div class="channel">
        $channel
      </div>
    </div>
  </div>
</div>`

function getGames(){
  return fetch(`${url}/games/top?limit=5`, {
    method: 'GET',
    headers: new Headers({
      Accept: accept,
      'Client-ID': clientId,
    }),
  }).then(res => {
    return res.json()
  }).catch(err => {
    return err
  })
}

function getStreams(name) {
  return fetch(`${url}/streams?game=${encodeURIComponent(name)}&limit=20`, {
    method: 'GET',
    headers: new Headers({
      Accept: accept,
      'Client-ID': clientId,
    }),
  }).then(res => {
    return res.json()
  }).catch(err => {
    return err
  })
}

getGames().then(games => {
  let topGames = games.top.map(game => game.game.name)
  for(let game of topGames) {
    let ele = document.createElement('li')
    ele.innerText = game
    document.querySelector('.navbar__list').appendChild(ele)
  }
  document.querySelector('h1').innerText = topGames[0]
  getStreams(topGames[0]).then(data => {
    appendStreams(data.streams)
    addEmptyBlock()
    addEmptyBlock()
  }) 
})

document.querySelector('.navbar__list').addEventListener('click', e => {
  if(e.target.tagName.toLowerCase() === 'li') {
    let text = e.target.innerText
    document.querySelector('.streams').innerHTML = ''
    document.querySelector('h1').innerText = text
    getStreams(text).then(data => {
      appendStreams(data.streams)
      addEmptyBlock()
      addEmptyBlock()
    })
  }
})

function appendStreams(streams){
  streams.forEach(stream => {
    let div = document.createElement('div')
    let content = appendHtml
      .replace('$preview', stream.preview.large)
      .replace('$logo', stream.channel.logo)
      .replace('$title', stream.channel.status)
      .replace('$channel', stream.channel.name)
    document.querySelector('.streams').appendChild(div)
    div.outerHTML = content
  })
}

function addEmptyBlock() {
  let div = document.createElement('div')
  div.classList.add('stream__empty')
  document.querySelector('.streams').appendChild(div)
}



