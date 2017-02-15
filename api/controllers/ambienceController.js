let ambienceModel = require('../models/ambience');

class ambienceController {
  getAmbiences(req, res) {
    let find = ambienceModel.find({})
      .limit(10)
      .skip((req.params.page - 1) * 10)
      .exec();
      find.then(ambiences => { res.json(ambiences)
    });
    find.catch(err => res.status(500).send(err));

  }

  getAmbiencesByName(req, res) {
    let query = {name: new RegExp(req.params.name, 'i')},
      skip = (req.params.page -1) * 10;

    let findByName =
      ambienceModel.find(query)
      .limit(10)
      .skip(skip)
      .exec();

    let findCount =
      ambienceModel.find(query).count();

    findByName.then(ambiences => {
      findCount.then(count => {
        res.json({
          ambiences: ambiences,
          count: count
        });
      });
    });

  }

  getAmbienceByName(req, res) {
    let query = {name: req.params.name};

    let find = ambienceModel.findOne(query);
    find.then(ambience => {
      res.json(ambience);
    });

    find.catch(err => {
      res.status(500).send(err);
    })
  }

  getAmbiencesCount(req, res) {
    let find = ambienceModel.find({}).count().exec()
    find.then(c => {
      res.json(c);
    })

    find.catch(e => res.status(500).send(err));
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
