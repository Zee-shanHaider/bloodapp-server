const express = require('express')

const router = express.Router();

const userController = require('../controllers/userController')

const fileUpload = require('../middlewares/fileUploads');

const isAuth = require('../middlewares/isAuth')


router.post('/api/postRequest',fileUpload.uploads, isAuth, userController.postRequest)

router.get('/api/getRequests', userController.getRequests)

module.exports =router