const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
const port = process.env.PORT || 5000
const prizeController = require('./controllers/prize')
const userController = require('./controllers/user')

app.set('view engine', 'ejs')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(flash())
app.use(express.static('public'))

app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errMessage = req.flash('errMessage')
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

app.get('/login', userController.login)

app.post('/login', userController.handle_login, redirectBack)

app.get('/logout', userController.logout)

app.get('/add_prize', checkPermission, prizeController.add_prize)

app.post('/add_prize', checkPermission, prizeController.handle_add_prize, redirectBack)

app.get('/edit/:id', checkPermission, prizeController.edit)

app.post('/edit', checkPermission, prizeController.handle_edit, redirectBack)

app.post('/delete', checkPermission, prizeController.delete, redirectBack)

app.get('/admin', checkPermission, prizeController.get_admin_prize)

app.get('/', prizeController.get_prize)

app.get('/lottery', prizeController.draw)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})