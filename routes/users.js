var express = require('express');
var router = express.Router();
const knex = require('../db');
const AuthController = require("../oauth");
const AWS = require('aws-sdk')
const fs = require('fs');
const queue = require('async-promise-queue');


const AWS_BUCKET_NAME = "ooni-users-photos";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const data = await knex('users').select('id', 'name', 'photo');
  res.send({status: 'OK', data});
});

router.post('/', async function (req, res, next) {
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const moment = require("moment");

  const saltRounds = 10;
  const {password, name, email} = req.body;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const timestamps = await moment.utc().format();
  const userId = (await knex('users').insert({
    name,
    email,
    password: password,
    active: 1,
    created_at: timestamps,
    updated_at: timestamps
  }).returning('id'))[0];


  const token = jwt.sign({id: userId}, process.env.JWT_SECRET);

  res.send({
    status: 'OK', data: {
      userId,
      token
    }
  });
});


router.post('/login', async function (req, res, next) {
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");

  const saltRounds = 10;
  const {password, email} = req.body;

  const user = await knex('users').where({email: email.toLowerCase()}).select('password', 'id').first();

  if (user && user.password) {
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
    res.send({
      status: 'OK', data: {
        token
      }
    });
    return;
  }

  res.send({
    status: "error",
    message: "User not found"
  });

});


router.get('/photo', AuthController.verifyToken, async function (req, res, next) {
  try {
    console.log('userId', req.userId)
    const data = await knex('photo').where({users_id: req.userId}).pluck('url').orderBy('created_at', 'desc');
    res.status(200).json({status: 'OK', data})
  } catch (e) {
    console.log(`error is ${e}`)
  }


});

router.post('/photo', AuthController.verifyToken, async function (req, res, next) {

  const userId = req.userId;
  const moment = require("moment");
  const timestamps = await moment.utc().format();
  //check if the image exists =

  let files = req.body.files;

  let uploadToS3Process = []

  for (let i = 0; i < files.length; i++) {

    let photo = await knex('photo').where({users_id:req.userId,name:files[i].filename}).first();
    if (photo){
      continue
    }else{
      console.log(`uploading ${files[i].filename}`)

      let buffer = Buffer.from(files[i].uri.replace(/^data:image\/\w+;base64,/, ""), 'base64');

      const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: files[i].filename, // File name you want to save as in S3
        Body: buffer,
        ACL: 'public-read',
      };
      //send the file to promises folder
      console.log(`start process :  ${files[i].filename}`)
      uploadToS3Process.push(s3.upload(params).promise())
      console.log(`end :  ${files[i].filename}`)
    }
  }

  let sucess = null
  await Promise.all(uploadToS3Process).then((response)=>{
     console.log(`response is ${response}`)

     return response;
  }).catch((failure)=>{
    console.log(`failure is ${failure}`)
    return failure;
  })

});


module.exports = router;
