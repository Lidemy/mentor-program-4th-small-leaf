let editBtn = document.querySelector('.update-nickname-btn')
editBtn.addEventListener('click', ()=>{
  document.querySelector('.fixed-block').classList.remove('hide')
})

document.querySelector('.update-btn').addEventListener('click', (e)=>{
  let value = document.querySelector('.board__nickname-update').value
  if(!value) {
    alert('錯誤：未填寫內容')
  }
})

document.querySelector('.cancel').addEventListener('click', ()=>{
  document.querySelector('.fixed-block').classList.add('hide')
})