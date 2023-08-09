import Users from '../models/user';

export default {
    getUsers: (req, res) => {
        Users.find({}, (error, results) => {
            if (error) {
                res.send(error);
                res.status(400);
                return;
            }

            res.json(results);
        });
    },
    getUser: (req, res) => {
        Users.findById(req.params.id, (error, result) => {
            if (error) {
                res.send(error);
                res.status(400);
                return;
            }

            if (result === null) {
                res.status(404);
                res.send('User not found');
                return;
            }

            res.json(result);
        });
    },
    createUser: (req, res) => {
        req.body.roles = [];
        Users.create(req.body, (error, result) => {
            if (error) {
                res.send(error);
                res.status(400);
                return;
            }

            res.json(result);
        });
    },
};
