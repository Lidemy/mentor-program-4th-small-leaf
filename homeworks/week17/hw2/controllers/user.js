const bcrypt = require('bcrypt')
const saltRounds = 10 
const db = require('../models')
const User = db.User

const userController = {
  login: (req, res) => {
    res.render('user/login')
  },

  handle_login: (req, res, next) => {
    const {username, password} = req.body
    if(!username || !password) {
      req.flash('errMessage', '請填寫必要欄位')
      return next()
    }

    User.findOne({
      where: {
        username
      }
    }).then(user => {
      if(!user) {
        req.flash('errMessage', '帳號或密碼錯誤')
        return next()
      }

      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if(err || !isSuccess) {
          req.flash('errMessage', '帳號或密碼錯誤')
          return next()
        }

        req.session.username = user.username
        res.redirect('admin')
      })
    }).catch(err => {
      req.flash('errMessage', err.toString())
      return next()
    })
  },

  logout: (req, res) => {
    req.session.username = null
    res.redirect('/') 
  }
}

module.exports = userController