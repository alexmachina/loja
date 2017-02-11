let saleModel = require('../models/sale');

class SaleController {
  getSales(req, res){
    let find = saleModel
      .find({})
      .limit(10)
      .skip((req.params.page -1) * 10)
      .exec();

    find.then(sales => res.json(sales));
    find.catch(err => res.status(500).send(err));
  }
  getSale(req, res){
    let find = saleModel.findById(req.params.id).exec();
    find.then(sale => res.json(sale));
    find.catch(err => res.status(500).send(err));
  
  }

  getSalesByName(req, res) {
    let findSales = saleModel
      .find({name: new RegExp(req.params.name, 'i')})
      .limit(10)
      .skip((req.params.page -1) * 10)
      .exec();

    let findCount = saleModel
      .find({name: new RegExp(req.params.name, 'i')})
      .count()
      .exec();

    findSales.then(sales => {
      findCount.then(count => {
        res.json({
          sales: sales,
          count: count
        });
      });
    });

  }
  addSale(req, res){
    let sale = new saleModel(req.body);
    debugger;

    if(req.file)
      sale.mainImage = req.file.filename;

    let save = sale.save();
    save.then(() => res.send());
    save.catch(err =>{
      console.log(err);
      res.status(500).send(err);
    })

  }
  updateSale(req, res){
    let sale = req.body;

    if(req.file)
      sale.mainImage = req.file.filename;

    let update = saleModel.findByIdAndUpdate(req.params.id,
      {$set: sale});

    update.then(() => res.send());
    update.catch(err => res.status(500).send(err));

  }

  getSalesCount(req, res) {
    let find = saleModel.find({}).count().exec();

    find.then(count => res.json(count));
    find.catch(err => res.json(err));
  }
}

module.exports = new SaleController();
