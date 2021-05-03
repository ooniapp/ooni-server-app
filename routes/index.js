var express = require('express');
const knex = require("../db");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index');
});

router.get('/dashboard',async function (req,res){
  let users = await knex('users')
  console.log('users',users)
  res.render('dashboard',{
    title: 'Dashboard',
    users:users
  })
})

router.get('/user/:id/details',async function (req,res){
  const data = await knex('photo').where({users_id:req.params.id}).pluck('url').orderBy('created_at', 'desc');
 console.log('data',data)
  res.render('details',{
    title: 'Dashboard',
    data:data
  })
})

module.exports = router;
