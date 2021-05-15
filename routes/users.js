var express = require('express');
var router = express.Router();
const knex = require('../db');
const AuthController = require("../oauth");
const AWS = require('aws-sdk')
const fs = require('fs');
const queue = require('async-promise-queue');
const multer = require('multer')
const multerS3 = require('multer-s3')

const AWS_BUCKET_NAME = "ooni-server-media-storage";


const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.AWS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
});

/*
const s3 = new AWS.S3({
    credentials: {
        accessKeyId: "AKIA2WWRCE6XOUA7TCHZ",
        secretAccessKey: "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"
    },
});
*/

const upload = multer({
    storage: multerS3({
        s3,
        bucket: AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata(req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key(req, file, cb) {
            cb(null,file.originalname);
        }
    })

})

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
    return res.json({
        status: 'OK',
        data: {
            userId,
            token
        }
    })
});


router.post('/login', async function (req, res, next) {
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");

    const saltRounds = 10;
    const {password, email} = req.body;

    const user = await knex('users').where({email: email.toLowerCase()}).select('password', 'id').first();

    if (user && user.password) {
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);

        return res.json({
            status: 'OK', data: {
                token
            }
        })

    }

    res.send({
        status: "error",
        message: "User not found"
    });

});


router.get('/photo', AuthController.verifyToken, async function (req, res, next) {
    try {
        console.log('userId from', req.userId)
        const data = await knex('photo').where({users_id: req.userId,isPosted:1}).pluck('url').orderBy('created_at', 'desc');
        console.log('data is ',data)
        res.status(200).json({status: 'OK', data})
    } catch (e) {
        res.status(200).json({status: 'NO', 'message': e.toString()})
    }


});

router.post('/photo',AuthController.verifyToken,upload.single('photo'), async function (req, res, next) {

    const userId = req.userId;
    const moment = require("moment");
    const timestamps = await moment.utc().format();
    //check if the image exists =
    let uploadedFile = req.file;
    console.log('userId ',userId)
    console.log('uploaded file is ',uploadedFile)
    if (uploadedFile){
        const uploaded = await knex('photo').insert({
            users_id: userId,
            name: uploadedFile.originalname,
            url: uploadedFile.location,
            isPosted:1,
            created_at: timestamps,
            updated_at: timestamps
        }).then((result) => {
            return res.status(200).json({
                status: 'OK',
                data: uploadedFile.location
            })
        }).catch((error) => {
            console.log('error from database')
            throw error
        });
    }
});


//method for upload in background
router.post('/media-background',AuthController.verifyToken,upload.array('backgroundUpload'),async function (req,res,next){
     //upload the video and data in background
    const userId = req.userId;
    const token = req.headers["x-access-token"];
    console.log('user id is ',userId)
    console.log('token id is ',token)
    const moment = require("moment");
    const timestamps = await moment.utc().format();
    let backgroundUpload = req.files


    let uploadLocation = [];

    for (const backgroundUploadElement of backgroundUpload) {
        const uploaded = await knex('photo').insert({
            users_id: userId,
            name: backgroundUploadElement.originalname,
            url: backgroundUploadElement.location,
            isPosted:0,
            created_at: timestamps,
            updated_at: timestamps
        }).then((result) => {
            uploadLocation.push(backgroundUploadElement)
        }).catch((error) => {
            console.log('error from database')
            throw error
        });
    }

    if (uploadLocation.length > 0){
        return res.status(200).json({
            status: 'OK',
            data: uploadLocation
        })
    }

})

module.exports = router;
