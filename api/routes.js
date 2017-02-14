const express = require('express'),
      productCtrl = require('./controllers/productController'),
      userCtrl = require('./controllers/userController'),
      ambienceCtrl = require('./controllers/ambienceController'),
      saleCtrl = require('./controllers/saleController'),
      categoryCtrl = require('./controllers/categoryController'),
      multer = require('multer'),
      jwt = require('jsonwebtoken'),
      uploadProduct = multer({'dest' : 'app/img/products'}),
      uploadAmbience = multer({'dest': 'app/img/ambiences'}),
      uploadSale = multer({'dest': 'app/img/sales'});

let router = new express.Router();
let auth = (req, res, next) => {
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
}

router.get('/', (req,res) => res.send("OK"));
router.get('/products/:page', productCtrl.getProducts);
router.get('/product/:id', productCtrl.getProduct);
router.post('/product',auth, uploadProduct.fields([{name: 'mainImage', maxCount:1}, {name:'images', maxCount:15}]), productCtrl.addProduct);
router.put('/product/:id', auth,uploadProduct.fields([{name: 'mainImage', maxCount:1}, {name:'images', maxCount:15}]), productCtrl.updateProduct);
router.post('/product/:id/addImages',auth, uploadProduct.array('images', 10), productCtrl.addImages);
router.post('/product/:id/removeImages',auth, productCtrl.removeImages);
router.get('/products/active', productCtrl.getActiveProducts);
router.get('/products/featured', productCtrl.getFeatureProducts);
router.get('/productsCount', productCtrl.getProductsCount);
router.get('/productsByName/:name/:page', productCtrl.getProductsByName);
router.get('/products/category/:categoryId', productCtrl.getProductsByCategory);
router.get('/product/byName/:name', productCtrl.getProductByName);


let uploadFields = uploadAmbience.fields([
  {name: 'mainImage', maxCount: 1},
  {name:'images', maxCount:15}
]);
router.get('/ambiences/:page', ambienceCtrl.getAmbiences);
router.get('/ambience/:id', ambienceCtrl.getAmbience);
router.get('/ambiences/active', ambienceCtrl.getActiveAmbiences);
router.post('/ambience', auth,uploadFields, ambienceCtrl.addAmbience);
router.put('/ambience/:id', auth,uploadFields, ambienceCtrl.updateAmbience);
router.get('/ambiencesCount', ambienceCtrl.getAmbiencesCount);
router.get('/ambiencesByName/:name/:page', ambienceCtrl.getAmbiencesByName);

router.get('/sales/:page', saleCtrl.getSales);
router.get('/sale/:id', saleCtrl.getSale);
router.post('/sale', uploadSale.single('mainImage'), saleCtrl.addSale);
router.put('/sale/:id', uploadSale.single('mainImage'), saleCtrl.updateSale);
router.get('/salesCount', saleCtrl.getSalesCount);
router.get('/salesByName/:name/:page', saleCtrl.getSalesByName);

router.get('/allCategories', categoryCtrl.getAllCategories);
router.get('/categories/:page', categoryCtrl.getCategories);
router.get('/category/:id', categoryCtrl.getCategory);
router.post('/category', categoryCtrl.addCategory);
router.put('/category/:id', categoryCtrl.updateCategory);
router.get('/categoriesCount', categoryCtrl.getCategoriesCount);
router.get('/categoriesByName/:name/:page', categoryCtrl.getCategoriesByName);
router.get('/categoryByName/:name', categoryCtrl.getCategoryByName);


router.post('/user', userCtrl.addUser);
router.get('/users', userCtrl.getUsers);
router.get('/user/:id', userCtrl.getUser);
module.exports = router;
