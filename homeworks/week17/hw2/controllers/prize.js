const db = require('../models')
const Prize = db.Prize

const prizeController = {
  get_prize: (req, res) => {
    Prize.findAll({
      order: [['weight']]
    }).then(prizes => {
      res.render('lottery', {
        prizes
      })
    })
  },

  get_admin_prize:(req, res) => {
    Prize.findAll({
      order: [['weight']]
    }).then(prizes => {
      res.render('admin', {
        prizes
      })
    })
  },

  draw: (req, res) => {
    Prize.findAll({
      order: [['weight', 'ASC']]
    }).then(prizes => {
      const prizeWeight = []
      const prizeName = []
      for(let prize of prizes) {
        prizeWeight.push(prize.weight)
        prizeName.push(prize.name)
      }
      const weightSum = prizeWeight.reduce((prev, curr) => prev + curr )
      const random = Math.random() * weightSum
      const concatWeightArr  = prizeWeight.concat(random)
      // console.log(concatWeightArr)
      const sortWeightArr = concatWeightArr.sort((a, b) =>  a - b )
      // console.log(sortWeightArr)
      let randomIndex = sortWeightArr.indexOf(random)
      // console.log(randomIndex)
      randomIndex = Math.min(randomIndex, prizeWeight.length - 1)
      // console.log(randomIndex)
      let name = prizeName[randomIndex]
      // console.log(name)
      Prize.findOne({
        where: {
          name
        }
      }).then(prize => {
        let result = {
          name: prize.name,
          award: prize.award,
          url: prize.url
        }
        return res.json(result);
      }).catch(err => {
        console.log(err)
      })
    })
  },

  add_prize: (req, res) => {
    res.render('add_prize')
  },

  handle_add_prize: (req, res, next) => {
    let {name, award, url, weight} = req.body
    if(!name || !award || !url || !weight) {
      req.flash('errMessage', '資料不齊全')
      return next()
    }

    weight = Number(weight)

    if(weight <= 0 || !Number.isInteger(weight)) {
      req.flash('errMessage', '權重數必須是正整數')
      return next()
    }

    Prize.create({
      name,
      award,
      url,
      weight
    }).then(() => {
      res.redirect('/admin')
    }).catch(err => {
      if(err.original.errno === 1062) {
        req.flash('errMessage', '權重數不可重複')
        return next()
      }
    })
  },

  edit: (req, res) => {
    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then(prize => {
      res.render('edit', {
        prize
      })
    })
  },

  handle_edit: (req, res, next) => {
    let {name, award, url, weight, id} = req.body
    if(!name || !award || !url || !weight || !id) {
      req.flash('errMessage', '資料不齊全')
      return next()
    }

    weight = Number(weight)

    if(weight <= 0 || !Number.isInteger(weight)) {
      req.flash('errMessage', '權重數必須是正整數')
      return next()
    }

    Prize.findOne({
      where: {
        id
      }
    }).then(prize => {
      return prize.update({
        name,
        award,
        url,
        weight
      }).catch(err => {
        if(err.original.errno === 1062) {
          req.flash('errMessage', '權重數不可重複')
          return next()
        }
      })
    }).then(() => {
      res.redirect('/admin')
    }).catch(err => {
      req.flash('errMessage', err.toString())
      return next()
    })
  },

  delete: (req, res, next) => {
    Prize.findOne({
      where: {
        id: req.body.id
      }
    }).then(prize => {
      prize.destroy()
      return next()
    }).catch(err => {
      req.flash('errMessage', err.toString())
      return next()
    })
  }

}

module.exports = prizeController