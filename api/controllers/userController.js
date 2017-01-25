const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

class UserController {
  getUser(req, res) {
    UserModel.findById(req.params.id, (err, user) =>{
      if(err)
       return res.status(500).send(err);
      else
        res.json(user);
    });
  }

  addUser(req, res) {
    let user = new UserModel(req.body);

    user.save().then(() => res.send())
    .catch(err=> res.status(500).send(err));
  }

  getUsers(req, res) {
    let find = UserModel.find({}).exec();
    find.then((users) => res.json(users));
    find.catch(err => res.status(500).send(err));
  }

  login(req, res) {
    let find = UserModel.findOne({username: req.body.username, password:req.body.password}).exec();

    find.then((user) => {
      if (user) {
      let token = jwt.sign({username: user.username, password: user.password}, 'donniebrasco')
      res.json(token);
      } else {
        res.status(404).send("User not found!");
      }
    });

    find.catch(err => res.status(500).send(err));
  }

}

module.exports = new UserController();
