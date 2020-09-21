let id = 1
let todoCount = 0
let unfinishTodoCount = 0
const temp = `
<div class="todo list-group-item list-group-item-action justify-content-between align-items-center $todoClass">
  <div class="todo__content-wrapper custom-control custom-checkbox">
    <input type="checkbox" class="check-todo custom-control-input" id="todo-$id">
    <label class="todo__content custom-control-label" for="todo-$id">
      $content
    </label>
  </div>
  <button type="button" class="btn-delete btn btn-danger">刪除</button>
</div>
`
$('.btn-add').click(() => {
 addTodo()
})

$('.todos').on('click', '.btn-delete', (e) => {
  const todo = $(e.target).parent()
  todo.remove()
  todoCount--
  const isChecked = todo.find('.check-todo').is(':checked')
  if(!isChecked) {
    unfinishTodoCount--
  }
  updateCoutnter()
})

$('.input-todo').keydown(e => {
  if(e.keyCode === 13) {
    addTodo()
  }
})

$('.todos').on('change', '.check-todo', e => {
  const target = $(e.target)
  const isChecked = target.is(':checked')
  if(isChecked) {
    unfinishTodoCount--
    target.parents('.todo').addClass('checked')
  } else {
    unfinishTodoCount++
    target.parents('.todo').removeClass('checked')
  }
  updateCoutnter()
})

$('.clear-all').click(() => {
  todoCount -= $('.todo.checked').length
  $('.todo.checked').remove()
})

$('.options').on('click', 'div', e => {
  const target = $(e.target)
  const filter = target.attr('data-filter')
  $('.options div.active').removeClass('active')
  target.addClass('active')
  if (filter === 'all') {
    $('.todo').show()
  } else if (filter === 'unfinish') {
    $('.todo').show()
    $('.todo.checked').hide()
  } else if(filter === 'done') { 
    $('.todo').hide()
    $('.todo.checked').show()
  }
})

$('.btn-save').click(() => {
  let todos = []
  $('.todo').each((i, ele) => {
    const input = $(ele).find('.check-todo')
    const label = $(ele).find('.todo__content')
    todos.push({
      id: input.attr('id').replace('todo-', ''),
      content: label.text().trim(),
      isDone: $(ele).hasClass('checked')
    })
  })
  const data = JSON.stringify(todos)
  $.ajax({
    type: 'POST',
    url: 'http://mentor-program.co/mtr04group4/small-leaf/week12/todolist/api_add_todo.php',
    data: {
      todo: data
    },
    success: res => {
      const id = res.id
      window.location = `http://mentor-program.co/mtr04group4/small-leaf/week12/todolist/index.html?id=${id}`
    },
    error: () => {
      alert('儲存失敗')
    }
  });
})

const searchParams = new URLSearchParams(window.location.search);
const todoId = searchParams.get('id')
if(todoId) {
  $.getJSON(`http://mentor-program.co/mtr04group4/small-leaf/week12/todolist/api_get_todo.php?id=${todoId}`, data => {
    const todos = JSON.parse(data.data.todo)
    restoreTodos(todos)
  });
}

function restoreTodos(todos) {
  if(todos.length === 0) return
  id = todos[todos.length - 1].id + 1
  for(let todo of todos) {
    let content = temp
      .replace('$content', escape(todo.content))
      .replaceAll('$id', todo.id)
      .replace('$todoClass', todo.isDone? 'checked' : '')

    $('.todos').append(content)
    todoCount++
    if(todo.isDone) {
      $(`#todo-${todo.id}`).prop( "checked", true )
    }
    if(!todo.isDone) {
      unfinishTodoCount++ 
    }
  }
}

function updateCoutnter() {
  $('.unfinish-count').text(unfinishTodoCount)
}

function addTodo() {
  const value = $('.input-todo').val()
  if(!value) {
    alert('Add something todo...')
    return
  }

  let content = temp
    .replace('$content', escape(value))
    .replaceAll('$id', id)

  $('.todos').append(content)
  id++
  todoCount++
  unfinishTodoCount++
  $('.input-todo').val('')
  updateCoutnter()
}

function escape(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}



