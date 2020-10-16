const express = require('express')
const moment = require('moment-timezone')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
const port = process.env.PORT || 5001
const postController = require('./controllers/post')
const userController = require('./controllers/user')
const categoryController = require('./controllers/category')

 
app.set('view engine', 'ejs')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(flash())

app.use(express.static('public'))

app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.userId = req.session.userId
  res.locals.errMessage = req.flash('errMessage')
  res.locals.formatTime = formatTime
  next()
})

function redirectBack(req, res) {
  res.redirect('back')
}

function formatTime(time) {
  return moment(time).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm')
}

function checkPermission(req, res, next) {
  if(!req.session.username) {
    res.redirect('/')
  } else {
    return next()
  }
}

app.get('/', postController.index)

app.get('/login', userController.login)

app.post('/login', userController.handle_login, redirectBack)

app.get('/logout', userController.logout)

app.get('/post_list', postController.post_list)

app.get('/post/:id', postController.post)

app.get('/category_list', categoryController.category_list)

app.get('/category/:id', categoryController.category, redirectBack)

app.get('/admin', checkPermission, postController.admin)

app.get('/add_post', checkPermission, postController.add_post)

app.post('/add_post', checkPermission, postController.handle_add_post, redirectBack)

app.get('/edit/:id', checkPermission, postController.edit)

app.post('/edit_post', checkPermission, postController.handle_edit_post, redirectBack)

app.post('/delete_post/:id', checkPermission, postController.delete, redirectBack)

app.get('/admin_category', checkPermission, categoryController.admin)

app.get('/add_category', checkPermission, categoryController.add)

app.post('/add_category', checkPermission, categoryController.handle_add_category, redirectBack)

app.get('/edit_category/:id', checkPermission, categoryController.edit_category)

app.post('/edit_category', checkPermission,categoryController.handle_edit_category, redirectBack)

app.post('/delete_category/:id', checkPermission, categoryController.delete, redirectBack)

app.get('/about_me', postController.about_me)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

