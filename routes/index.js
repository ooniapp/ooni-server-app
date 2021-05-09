var express = require('express');

const knex = require("../db");
var router = express.Router();


var sessionChecker = (req, res, next) => {
    if (req.session.logged) {
        next();
    } else {
        res.redirect('/login');
    }
};


router.get('/login',function(req, res, next) {
    res.render('login');
});

router.post('/login',function (req,res){
   const {email,password} = req.body
    if (email === '' || password === ''){
        console.log('please fill one')
    }else {
        console.log('email is',email)
        console.log('password is',password)
        if ((email === 'charzzz90265@gmail.com') && (password === '06111998OONI7624!')){
            req.session.logged = true
            res.redirect('/dashboard');
        }else {
            console.log('credentials incorrect')
        }
    }
})
/* GET home page. */
router.get('/',sessionChecker, function(req, res, next) {
  res.redirect('/dashboard');
});

router.get('/dashboard',sessionChecker,async function (req,res){
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
    photos:data
  })
})

module.exports = router;
