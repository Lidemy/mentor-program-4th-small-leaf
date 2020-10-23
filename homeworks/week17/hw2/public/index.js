  function getPrizeApi() {
    return fetch('/lottery').then(res => {
     return res.json()
    }).then(data => {
      getPrize(data)
    }).catch(err => {
      console.log(err)
    })
  }
  
  function getPrize(data) {
    const {name, award, url} = data
    document.querySelector('.lottery__block').classList.add('hide')
    document.querySelector('.lottery__result').classList.remove('hide')
    document.querySelector('.lottery__result__prize > h2').innerText = name
    document.querySelector('.lottery__result__prize > p').innerText = award
    document.querySelector('.lottery__result').style.background = `url(${url}) center / cover no-repeat`
  }
  
  document.querySelector('.lottery__btn').addEventListener('click', getPrizeApi)
