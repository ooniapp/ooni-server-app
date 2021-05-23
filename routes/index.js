var express = require('express');

const knex = require("../db");
var router = express.Router();
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const fetch = require('node-fetch')
var JSZip = require("jszip");



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
  const data = await knex('photo').where({users_id:req.params.id}).orderBy('created_at', 'desc');

  console.log('data',data)
  res.render('details',{
    title: 'Dashboard',
    photos:data
  })
})


router.get('/user/download/:id',async function (req,res){
    //retrieve all the folder that have the id

    const data = await knex('photo').where({users_id:req.params.id,folder:req.params.id})
    let urls = []
    if (data.length > 0){
        var zip = new JSZip();
         let mediaZip = zip.folder(`ooni-media-user-${req.params.id}`)
         let url = []
        for (let i = 0; i < data.length; i++) {
            let request = await fetch(data[i].url).then((response)=>{
                var file = fs.createWriteStream(`./public/images/uploads/${data[i].name}`);
                response.body.pipe(file);
                console.log('end processing')
                url.push()
                mediaZip.file(`./public/images/uploads/${data[i].name}`)

            }).catch((error)=>{
                console.log('error is',error)
            })
        }
        mediaZip.generateAsync({type:"base64"}).then(function (base64) {
            let url =  "data:application/zip;base64," + base64;
            return res.json({
                'data':url
            })
        }, function (err) {
           console.log('error is ',err)
        });



    }else{
      res.end('This user has no media to download')
    }

})

module.exports = router;
