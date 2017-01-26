const express = require('express'),
      bodyParser = require('body-parser'),
      router = require('./api/routes'),
      mongoose = require('mongoose'),
      userCtrl = require('./api/controllers/userController');

let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/',express.static('app'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
    return res.end();
  }
  next();
});

app.post('/login', userCtrl.login);
app.use(router);

app.listen(3000, err => {
  err ? console.log(err) :console.log("Running: 3000");

  mongoose.connect('mongodb://localhost/loja');
}
);
