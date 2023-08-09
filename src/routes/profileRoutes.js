import userController from '../controllers/userController';
import express from 'express';

var router = express.Router();

router.route('/self').get(userController.getSelf);

module.exports = router;
