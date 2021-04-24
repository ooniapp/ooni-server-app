var express = require('express');
var router = express.Router();
const knex = require('../db');
const AuthController = require("../oauth");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const data = await knex('users').select('id','name', 'photo');
  res.send({status: 'OK', data});
});

router.post('/', async function(req, res, next) {
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const moment = require("moment");

  const saltRounds = 10;
  const { password, name, email } = req.body;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const timestamps = await moment.utc().format();
  const userId = (await knex('users').insert({
    name,
    email,
    password: passwordHash,
    active: 1,
    created_at: timestamps,
    updated_at: timestamps
  }).returning('id'))[0];


  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

  res.send({status: 'OK', data: {
      userId,
      token
    }
  });
});


router.post('/login', async function(req, res, next) {
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");

  const saltRounds = 10;
  const { password, email } = req.body;

  const user = await knex('users').where({ email: email.toLowerCase() }).select('password', 'id').first();

  if(user && user.password){
    const isValid = await bcrypt.compare(password, user.password);
    if(isValid){
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.send({status: 'OK', data: {
        token
      }});
      return;
    }
  }

  res.send({
    status: "error",
    message: "User not found"
  });

});


router.get('/photo', AuthController.verifyToken, async function(req, res, next) {
  try {
    console.log('userId',req.userId)
    const data = await knex('photo').where({users_id:req.userId}).pluck('url').orderBy('created_at', 'desc');
    res.status(200).json({status: 'OK', data})
  }catch (e) {
    console.log(`error is ${e}`)
  }



});

router.post('/photo', AuthController.verifyToken, async function(req, res, next) {
  const userId = req.userId;
  const moment = require("moment");
  const timestamps = await moment.utc().format();
  //check if the image exists =
  let photo = await knex('photo').where({users_id:req.userId,image:req.body.image}).first();
  if (photo){
    console.log(`photo is ${photo}`)
    if (photo.url === ''){
      await knex('photo')
          .where({ id: photo.id })
          .update({  url: req.body.url,})
    }else{
      return  res.json({
        'code':'photo_found',
        'name':req.body.image
      })
    }

  }else{
    const data = await knex('photo').insert({
      users_id: userId,
      image: req.body.image,
      url: req.body.url,
      created_at: timestamps,
      updated_at: timestamps
    });
    res.send({status: 'OK', data});
  }

});


module.exports = router;
