import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import authConfig from '../config/authConfig';

import Users from '../models/user';
const router = express.Router();

router.post('/', async (req, res, next) => {
    const user = await Users.findOne({ username: req.body.username });
    if (!user || !user.isValidPassword(req.password)) {
        res.statusCode(401);
        return;
    }

    const body = {
        _id: user._id,
        username: user.username,
        roles: user.roles,
    };
    const jwtToken = jsonwebtoken.sign({ user: body }, authConfig.key);

    res.json({
        jwtToken
    });
    return;
});

module.exports = router;
