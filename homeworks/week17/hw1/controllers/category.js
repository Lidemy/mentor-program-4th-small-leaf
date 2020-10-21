const db = require('../models')
const Category = db.Categories
const Post = db.Post

const categoryController = {
  admin: (req, res) => {
    Category.findAll({
      include: [{
        model: Post,
        where: {
          is_delete: null,
        },
        required: false
      }],
      where: {
        is_delete: null
      },
      order: [['id', 'DESC']]
    }).then(categories => {
      res.render('admin_category', {
        categories
      })
    })
  },

  add: (req, res) => {
    res.render('add_category')
  },

  category: (req, res, next) => {
    Post.findAll({
      include: Category,
      where: {
        CategoryId: req.params.id,
        is_delete: null
      },
      order: [['id', 'DESC']]
    }).then(posts => {
      if(posts.length !== 0) {
        res.render('category', {
          posts
        })
      }

      if(posts.length === 0) {
        req.flash('errMessage', '該分類並無文章')
        return next()
      }
    })
  },

  handle_add_category: (req, res, next) => {
    const {userId} = req.session 
    const {name} = req.body
    if(!userId || !name) {
      req.flash('errMessage', '資料不齊全')
      return next()
    }

    Category.create({
      name
    }).then(() => {
      res.redirect('/admin_category')
    })
  },

  delete: (req, res, next) => {
    Category.findOne({
      include: Post,
      where: {
        id: req.params.id,
      }      
    }).then(category => {
      if(category.Posts.length === 0) {
        return category.update({
          is_delete: 1
        })
      } 

      if(category.Posts.length !== 0) {
        req.flash('errMessage', '該分類內還有文章')
        return next()
      }
     
    }).then(() => {
      res.redirect('back')
    }).catch(() => {
      return next()
    })
  },

  edit_category: (req, res) => {
    const lastPage = req.header('referer')
    Category.findOne({
      where: {
        id: req.params.id
      }
    }).then(category => {
      res.render('edit_category', {
        category, lastPage
      })
    })
  },

  handle_edit_category: (req, res, next) => {
    const {name, id, lastPage} = req.body
    const {userId} = req.session 
    if(!userId || !name || !id) {
      req.flash('errMessage', '資料不齊全')
      return next()
    }

    Category.findOne({
      where: {
        id: req.body.id
      }
    }).then(category => {
      return category.update({
        name
      })
    }).then(() => {
      res.redirect(lastPage)
    }).catch(() => {
      return next()
    })
  },

  category_list: (req, res) => {
    Category.findAll({
      include: [{
        model: Post,
        where: {
          is_delete: null,
        },
        required: false
      }],
      where: {
        is_delete: null
      },
      order: [['id', 'DESC']]
    }).then(categories => {
      res.render('category_list', {
        categories
      })
    })
  },
}

module.exports = categoryController