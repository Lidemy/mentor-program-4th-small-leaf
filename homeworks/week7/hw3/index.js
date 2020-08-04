function addItem(ele){
  const div = document.createElement('div')
  div.classList.add('todo')
  div.innerHTML = ` 
    <label>
      <input class="todo__check" type="checkbox">
      <span class="todo__title">${escapeHtml(ele)}</label></span>
    </label>
    <button class="btn-del">刪除</button>`
  document.querySelector('.todos').appendChild(div)
  document.querySelector('.todo-input').value = ''
} 


document.querySelector('.btn-add').addEventListener('click', () => {
  const value = document.querySelector('.todo-input').value
  if(!value || value.trim() == '') return alert('Add something todo...')
  addItem(value)
})

document.querySelector('.todo-list').addEventListener('keydown', (e) => {
  const value = document.querySelector('.todo-input').value
  if((!value  || value.trim() == '') && e.keyCode === 13) return alert('Add something todo...')
  if(e.keyCode === 13) addItem(value)

})


document.querySelector('.todos').addEventListener('click', e => {
  const target = e.target
  if(target.classList.contains('btn-del')) {
    target.parentNode.remove()
    return
  }

  if(target.classList.contains('todo__check')) {
    if(target.checked) {
      target.parentNode.parentNode.classList.add('done')
    } else {
      target.parentNode.parentNode.classList.remove('done')
    }
  }
})

function escapeHtml(todo) {
  return todo
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}