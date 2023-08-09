import userController from '../controllers/userController';
import express from 'express';

var router = express.Router();

router.route('/').post(userController.createUser);

router.route('/:id').get(userController.getUser);

module.exports = router;
