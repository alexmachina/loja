let saleModel = require('../models/sale');

class SaleController {
  getSales(req, res){
    let find = saleModel.find({}).exec();
    find.then(sales => res.json(sales));
    find.catch(err => res.status(500).send(err));
  }
  getSale(req, res){
    let find = saleModel.findById(req.params.id).exec();
    find.then(sale => res.json(sale));
    find.catch(err => res.status(500).send(err));
  
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
}

module.exports = new SaleController();
