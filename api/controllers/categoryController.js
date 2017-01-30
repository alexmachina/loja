let categoryModel = require('../models/category');

class categoryController {
  getCategories(req, res) {
    let find = categoryModel.find({}).exec();
    find.then(categories => res.json(categories));
    find.catch(err => res.status(500).catch(err));
  }

  getCategory(req, res) {
    let find = categoryModel.findById(req.params.id).exec();
    find.then(category => res.json(category));
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
