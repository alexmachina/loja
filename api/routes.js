const express = require('express'),
      productCtrl = require('./controllers/productController'),
      userCtrl = require('./controllers/userController'),
      multer = require('multer'),
      jwt = require('jsonwebtoken'),
      upload = multer({'dest' : 'app/img/products'});

let router = new express.Router();
router.use((req, res, next) => {
  let token = req.headers['authorization'];
  debugger;
  if (token) {
    jwt.verify(token, 'donniebrasco', (err, decoded) => {
      if(err)
        return res.status(500).send("Decoding error");
      next();
    });
  } else {
    res.status(403).send("oops, no token");
  }
});

router.get('/', (req,res) => res.send("OK"));
router.get('/products', productCtrl.getProducts);
router.get('/product/:id', productCtrl.getProduct);
router.post('/product', upload.fields([{name: 'mainImage', maxCount:1}, {name:'images', maxCount:15}]), productCtrl.addProduct);
router.put('/product/:id',upload.fields([{name: 'mainImage', maxCount:1}, {name:'images', maxCount:15}]), productCtrl.updateProduct);
router.post('/product/:id/addImages', upload.array('images', 10), productCtrl.addImages);
router.post('/product/:id/removeImages', productCtrl.removeImages);


router.post('/user', userCtrl.addUser);
router.get('/users', userCtrl.getUsers);
router.get('/user/:id', userCtrl.getUser);
module.exports = router;
