const express = require('express');
const router = express.Router();
const userData = require('../../controler/users.controler')

router.route('/all')
    .get(userData.getAllUser)

router.route('/random')
    .get(userData.getRandomUser)

router.route('/save')
    .post(userData.saveUser)

router.route('/update/:id')
    .patch(userData.updateUser)

module.exports = router;

