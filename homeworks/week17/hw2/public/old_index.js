const url = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
const errorMessage = '系統不穩定，請再試一次'

function getPrize(cb) {
  const req = new XMLHttpRequest()
  req.open('GET', url, true)
  req.send()
  req.onload = function () {
    if (req.status >= 200 && req.status < 400) {
      let data
      try {
        data = JSON.parse(req.responseText)
      } catch (error) {
        cb(errorMessage)
        console.log(error)
        return
      }

      if (!data.prize) {
        cb(errorMessage)
        return
      }

      cb(null, data)
    } else {
      cb(errorMessage)
    }
  }
  req.onerror = function () {
    cb(errorMessage)
  }
}

document.querySelector('.lottery__btn').addEventListener('click', () => {
  getPrize(function (err, data) {
    if (err) {
      alert(err)
      return
    }
    let className
    let prizeName
    switch (data.prize) {
      case 'FIRST':
        className = 'first-prize'
        prizeName = '恭喜你中頭獎了！日本東京來回雙人遊！'
        break;

      case 'SECOND':
        className = 'second-prize'
        prizeName = '二獎！90 吋電視一台！'
        break;

      case 'THIRD':
        className = 'third-prize'
        prizeName = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
        break;

      case 'NONE':
        className = 'none-prize'
        prizeName = '銘謝惠顧'
        break;
    }
    document.querySelector('.lottery__result').classList.add(className)
    document.querySelector('.lottery__result__prize h2').innerText = prizeName
    document.querySelector('.lottery__block').classList.add('hide')
    document.querySelector('.lottery__result').classList.remove('hide')
  })
})
