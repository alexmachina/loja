let productModel = require('../models/product');
let categoryModel = require('../models/category');

class ProductController {

  getProductsByCategory(req, res) {
    let find = categoryModel.find({}).populate('products').exec();
    find.then(categories => res.send(categories));
    find.catch(err => res.status(500).send(err));
  }

  getProductsByName(req, res) {
    let query = {name: new RegExp(req.params.name, 'i')};

    let findByName =
      productModel.find(query)
      .skip((req.params.page -1) * 10)
      .limit(10)
      .exec()

    let findCount =
      productModel.find(query).count().exec()

    Promise.all([findByName, findCount])
      .then(results => {
        res.json({
          products: results[0],
          count: results[1]
        });
      })

  }

  getProductByName(req, res) {
    let query = {name: req.params.name};
    let find = productModel.findOne(query).exec();

    find.then(product => {
      res.json(product);
    });

    find.catch(err => {
      res.status(500).send(err);
    });
  }

  getProductsByCategory(req, res) {
    let findByCategory = productModel.find({category: req.params.categoryId});
    findByCategory.then(products => {
      res.json(products);
    });
    findByCategory.catch(err => {
      res.status(500).send(err);
    });
  }

  getProducts(req, res) {
    let find = productModel.find({})
      .limit(10)
      .skip((req.params.page -1) * 10)
      .exec();
    console.log(req.params.page);

    find.then(prods => res.json(prods));

    find.catch(err => {
      res.status(500).send(err);
      console.log(err);
    })
  }

  getProductsCount(req, res) {
    let find = productModel.find({}).count().exec();
    find.then(c => res.json(c));
    find.catch(err => res.status(500).send(err));
  }

  getActiveProducts(req, res) {
    let find = productModel.find({active: true}).exec();
    find.then(products => res.json(products));
    find.catch(err => res.status(500).send(err));
  }

  getFeatureProducts(req, res) {
    let find = productModel.find({featured: true, active: true});
    find.then(products => res.json(products));
    find.catch(err => res.status(500).send(err));
  }

  getProduct(req, res) {
    productModel.findById(req.params.id).exec()
      .then(prod => res.json(prod))
      .catch(err => res.status(500).send(err));
  }
  addProduct(req, res) {
    let p = new productModel(req.body);

    if(req.files && req.files.mainImage)
      p.mainImage = req.files.mainImage[0].filename;
    if(req.files && req.files.images)
      p.images = req.files.images.map((i) => i.filename);

    p.save()
      .then((newProduct) => {
        categoryModel.findById(p.category).exec().then(category => {
          category.products.push(newProduct._id);
          category.save().then(() => {
            res.send();
          })
        })
      })
      .catch(err => res.status(500).send(err));
  }
  updateProduct(req, res) {
    let product = req.body;

    if(req.files && req.files.mainImage){
      product.mainImage = req.files.mainImage[0].filename;
    }

    if(req.files && req.files.images){
      product.images = req.files.images.map((i) => i.filename);
    }

    productModel.findByIdAndUpdate(req.params.id, {$set: product})
      .then(() => res.send())
      .catch(err => res.status(500).send(err));
  }

  addImages(req, res) {
    let id = req.params.id;
    productModel.findById(id, (err, product) => {
      if (err) {
        return res.status(500).send(err);
      }
      debugger;

      let newImages = req.files.map((i) => i.filename);

      product.images = product.images.concat(newImages);
      product.save().then(() => res.send());
    });
  }

  removeImages(req, res){
    let id = req.params.id;
    productModel.findById(id, (err, product) => {
      if(err){
        return res.status(500).send(err);
      }
      product.images.splice(product.images.indexOf(req.body.image), 1);
      product.save().then(() => res.send());
    }); //findById
  }

}

module.exports = new ProductController();
