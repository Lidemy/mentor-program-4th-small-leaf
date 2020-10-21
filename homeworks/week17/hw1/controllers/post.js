const db = require('../models')
const Post = db.Post
const Category = db.Categories

const postController = {
  index: (req, res) => {
    Post.findAll({
      where: {
        is_delete: null
      },
      include: Category,
      order: [['id', 'DESC']]
    }).then(posts => {
      res.render('index', {
        posts
      }) 
    })
  },

  post: (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      include: Category,
      order: [['id', 'DESC']]
    }).then(post => {
      res.render('post', {
        post
      })
    })
  },

  add: (req, res) => {
    Post.findAll({
      include: Category
    }).then(posts => {
      res.render('add_post', {
        posts
      })
    })
  },

  handle_add_post: (req, res, next) => {
    const {userId} = req.session 
    const {title, content, category_id} = req.body
    if(!userId || !title || !content || !category_id) {
      req.flash('errMessage', '資料不齊全')
      return next()
    }

    Post.create({
      title,
      content,
      CategoryId: category_id,
      UserId: userId
    }).then(() => {
      res.redirect('/admin')
    })
   },

  admin: (req, res) => {
    Post.findAll({
      where: {
        is_delete: null
      },
      order: [['id', 'DESC']]
    }).then(posts => {
      res.render('admin', {
        posts
      })
    })
  },

  add_post: (req,res) => {
    Category.findAll({
      where: {
        is_delete: null
      }
    }).then(categories => {
      res.render('add_post', {
        categories
      })
    })
  },

  edit: (req, res, next) => {
    const lastPage = req.header('referer')
    Post.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId,
      },
      include: Category
    }).then(post => {
      Category.findAll({
        where: {
          is_delete: null 
        }
      }).then(categories => {
        res.render('edit', {
          post, categories, lastPage
        })
      })  
    })
  },

  handle_edit_post: (req, res, next) => {
    const {title, content, category_id, id, lastPage} = req.body
    const {userId} = req.session 
    if(!userId || !title || !content || !category_id || !id) {
      req.flash('errMessage', '資料不齊全')
      return next()
    }

    Post.findOne({
      where: {
        id: req.body.id,
      }
    }).then(post => {
      return post.update({
        title,
        content,
        CategoryId: req.body.category_id
      })
    }).then(() => {
      res.redirect(lastPage)
    }).catch(() => {
      return next()
    })
  },

  delete: (req, res, next) => {
    Post.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(post => {
      return post.update({
        is_delete: 1
      })
    }).then(() => {
      res.redirect('back')
    }).catch(() => {
      return next()
    })
  },

  post_list: (req,res) => {
    Post.findAll({
      where: {
        is_delete: null
      },
      order: [['id', 'DESC']]
    }).then(posts => {
      res.render('post_list', {
        posts,
      })
    })
  },

  about_me: (req, res) => {
    res.render('about_me')
  }
}

module.exports = postController