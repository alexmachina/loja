const express = require('express'),
      productCtrl = require('./controllers/productController'),
      userCtrl = require('./controllers/userController'),
      ambienceCtrl = require('./controllers/ambienceController'),
      multer = require('multer'),
      jwt = require('jsonwebtoken'),
      uploadProduct = multer({'dest' : 'app/img/products'}),
      uploadAmbience = multer({'dest': 'app/img/ambiences'});

let router = new express.Router();
router.use((req, res, next) => {
  let token = req.headers['authorization'];
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
router.post('/product', uploadProduct.fields([{name: 'mainImage', maxCount:1}, {name:'images', maxCount:15}]), productCtrl.addProduct);
router.put('/product/:id',uploadProduct.fields([{name: 'mainImage', maxCount:1}, {name:'images', maxCount:15}]), productCtrl.updateProduct);
router.post('/product/:id/addImages', uploadProduct.array('images', 10), productCtrl.addImages);
router.post('/product/:id/removeImages', productCtrl.removeImages);

let uploadFields = uploadAmbience.fields([
  {name: 'mainImage', maxCount: 1},
  {name:'images', maxCount:15}
]);
router.get('/ambiences', ambienceCtrl.getAmbiences);
router.get('/ambience/:id', ambienceCtrl.getAmbience);
router.post('/ambience', uploadFields, ambienceCtrl.addAmbience);
router.put('/ambience/:id', uploadFields, ambienceCtrl.updateAmbience);


router.post('/user', userCtrl.addUser);
router.get('/users', userCtrl.getUsers);
router.get('/user/:id', userCtrl.getUser);
module.exports = router;
