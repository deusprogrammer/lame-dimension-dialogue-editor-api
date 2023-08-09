import Users from '../models/user';
import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';

import authConfig from '../config/authConfig';

export default {
    login: async (req, res, next) => {
        const user = await Users.findOne({ username: req.body.username });
        if (!user) {
            res.statusCode(401);
            return;
        }
    },
    loginUser: (req, res, next) => {
        passport.authenticate('login', (error, user, info) => {
            if (error) {
                res.status(401);
                res.send(error);
                return;
            }

            console.log('SEARCHING FOR USER: ' + user._id);

            Authentications.findOne({ user: user._id }, (error, found) => {
                if (error) {
                    res.status(400);
                    res.send(error);
                    return;
                }

                console.log('FOUND: ' + found);

                // If not found create a new one.
                if (found === null) {
                    console.log('NOT FOUND');

                    const body = {
                        _id: user._id,
                        username: user.username,
                        roles: user.roles,
                    };
                    const jwtToken = jsonwebtoken.sign(
                        { user: body },
                        authConfig.key
                    );
                    var expires = new Date(new Date().getTime() + 60 * 60000);

                    Authentications.create(
                        { jwtToken, user: user._id, expires },
                        (error, created) => {
                            if (error) {
                                res.status(400);
                                res.send(error);
                                return;
                            }

                            res.status(200);
                            res.json(created);
                        }
                    );
                    return;
                }

                res.status(200);
                res.json(found);
            });
        })(req, res, next);
    },
};
