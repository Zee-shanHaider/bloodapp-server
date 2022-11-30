const express = require('express');

const router = express.Router();

const donorController = require('../controllers/donorController')

const isAuth = require('../middlewares/isAuth')


router.post('/api/postDonor',isAuth, donorController.postDonor)

router.get('/api/getDonors', donorController.getDonors)

 module.exports = router