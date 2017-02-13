let categoryModel = require('../models/category');

class categoryController {
  getCategories(req, res) {
    let find = categoryModel
      .find({})
      .skip((req.params.page -1) * 10)
      .limit(10)
      .exec();

    find.then(categories => res.json(categories));
    find.catch(err => res.status(500).catch(err));
  }

  getAllCategories(req, res){
    let find = categoryModel.find({});

    find.then(categories => res.json(categories));
    find.catch(err => res.status(500).json(err));
  }

  getCategoryByName(req, res) {
    let find = categoryModel.findOne({name: req.params.name});

    find.then(category => res.json(category));
    find.catch(err => res.status(500).send(err));
  }

  getCategoriesByName(req, res) {
    let find = categoryModel
      .find({name: new RegExp(req.params.name,'i')})
      .limit(10)
      .skip((req.params.page -1) * 10)
      .exec();

    let count = categoryModel
      .find({name: req.params.name})
      .count()
      .exec();

    find.then(categories => {
      count.then(count => {
        console.log(categories);
        console.log(req.params.name);
        res.json({
          categories : categories,
          count: count
        });
      });
    });
  }

  getCategoriesCount(req, res) {
    let find = categoryModel.find({}).count().exec();
    find.then(count => res.json(count));
    find.catch(err => res.status(500).send(err));
  }

  getCategory(req, res) {
    let find = categoryModel.findById(req.params.id).populate('categories').exec();
    find.then(category => {
      console.log(category);
      res.json(category)
    });
    find.catch(err => res.status(500).catch(err));

  }

  addCategory(req, res) {
    let category = new categoryModel(req.body),
      save = category.save();
    save.then(() => res.send());
    save.catch(err => res.status(500).send(err));
  }

  updateCategory(req, res) {
    let id = req.params.id;

    let update =
      categoryModel.findByIdAndUpdate(id, {$set: req.body});
    update.then(() => res.send());
    update.catch(err => res.status(500).send(err));

  }
}

module.exports = new categoryController();
