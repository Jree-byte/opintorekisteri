const Opintojakso = require('../models/opintojakso.model');

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "ei voi olla tyhja!" });
    return;
  }
  const opintojakso = new Opintojakso({
    nimi: req.body.nimi,
    laajuus_op: req.body.laajuus_op,
    kuvaus: req.body.kuvaus,
  });

  try {
    const data = await Opintojakso.create(opintojakso);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || "virhe." });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Opintojakso.getAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || "virhe." });
  }
};

exports.findOne = async (req, res) => {
  try {
    const data = await Opintojakso.findById(req.params.id);
    if (!data) {
      res.status(404).send({ message: `virhe, opintojaksoa ei loydy.` });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({ message: "virhe"  });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "ei voi olla tyhja!" });
    return;
  }
  try {
    const data = await Opintojakso.updateById(req.params.id, new Opintojakso(req.body));
    if (!data) {
      res.status(404).send({ message: `opintojaksoa ei loydy.` });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({ message: "virhe"});
  }
};

exports.delete = async (req, res) => {
  try {
    const affectedRows = await Opintojakso.remove(req.params.id);
    if (affectedRows === 0) {
      res.status(404).send({ message: `opintojaksoa ei loydy.` });
    } else {
      res.status(204).send(); 
    }
  } catch (err) {
    res.status(500).send({ message: "opintojaksoa ei voi poistaa" });
  }
};