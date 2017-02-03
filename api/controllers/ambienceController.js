let ambienceModel = require('../models/ambience');

class ambienceController {
  getAmbiences(req, res) {
    let find = ambienceModel.find({}).exec();
    find.then(ambiences => res.json(ambiences));
    find.catch(err => res.status(500).send(err));

  }

  getActiveAmbiences(req, res) {
    let find = ambienceModel.find({active: true}).exec();
    find.then(ambiences => res.json(ambiences));
    find.catch(err => res.status(500).send(err));
  }
  getAmbience(req, res) {
    let find = ambienceModel.findById(req.params.id).exec();
    find.then(ambience => res.json(ambience));
    find.catch(err => res.status(500).send(err));
  }
  addAmbience(req, res) {
    let ambience = new ambienceModel(req.body);

    if(req.files && req.files.mainImage) {
      ambience.mainImage = req.files.mainImage[0].filename;
    }

    if(req.files && req.files.images) {
      ambience.images = req.files.images.map(i=> i.filename);
    }

    let save = ambience.save();

    save.then(() => res.send());
    save.catch(err => res.status(500).send(err));

  }
  updateAmbience(req, res) {
    let ambience = req.body;

    if(req.files && req.files.mainImage) {
      ambience.mainImage = req.files.mainImage[0].filename;
    }

    if(req.files && req.files.images) {
      ambience.images = req.files.images.map(i=> i.filename);
    }

    let update = ambienceModel.findByIdAndUpdate(req.params.id,
      {$set : ambience});
    update.then(() => res.send());
    update.catch(err => res.status(500).send(err));
  }
}

module.exports = new ambienceController();
