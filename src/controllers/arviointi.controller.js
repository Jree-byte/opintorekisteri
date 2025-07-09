const Arviointi = require('../models/arviointi.model');
const Opiskelija = require('../models/opiskelija.model'); 
const Opintojakso = require('../models/opintojakso.model'); 

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "ei voi olla tyhja!" });
    return;
  }

  // Validate foreign keys existence
  const opiskelijaExists = await Opiskelija.findById(req.body.opiskelija_id);
  if (!opiskelijaExists) {
    return res.status(400).send({ message: `Opiskelijaa ei loydy.` });
  }

  const opintojaksoExists = await Opintojakso.findById(req.body.opintojakso_id);
  if (!opintojaksoExists) {
    return res.status(400).send({ message: `Opintojaksoa ei loydy.` });
  }

  const arviointi = new Arviointi({
    opiskelija_id: req.body.opiskelija_id,
    opintojakso_id: req.body.opintojakso_id,
    arvosana: req.body.arvosana,
    paivamaara: req.body.paivamaara,
  });

  try {
    const data = await Arviointi.create(arviointi);
    res.status(201).send(data);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).send({ message: "arvio on jo olemassa" });
    } else {
      res.status(500).send({ message: err.message || "virhe." });
    }
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Arviointi.getAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || "virhe." });
  }
};

exports.findOne = async (req, res) => {
  try {
    const data = await Arviointi.findById(req.params.id);
    if (!data) {
      res.status(404).send({ message: `Arvioiontia ei loydy.` });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({ message: "Arviointia ei loydy" });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "ei voi olla tyhja!" });
    return;
  }
  
  const opiskelijaExists = await Opiskelija.findById(req.body.opiskelija_id);
  if (!opiskelijaExists) {
    return res.status(400).send({ message: `Opiskelijaa ei loydy.` });
  }

  const opintojaksoExists = await Opintojakso.findById(req.body.opintojakso_id);
  if (!opintojaksoExists) {
    return res.status(400).send({ message: `Opintojaksoa ei loydy.` });
  }

  try {
    const data = await Arviointi.updateById(req.params.id, new Arviointi(req.body));
    if (!data) {
      res.status(404).send({ message: `Arviointia ei loydy.` });
    } else {
      res.send(data);
    }
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).send({ message: "Arviointi on jo olemassa." });
    } else {
      res.status(500).send({ message: "Virhe" });
    }
  }
};

exports.delete = async (req, res) => {
  try {
    const affectedRows = await Arviointi.remove(req.params.id);
    if (affectedRows === 0) {
      res.status(404).send({ message: `arviointia ei loydy.` });
    } else {
      res.status(204).send(); 
    }
  } catch (err) {
    res.status(500).send({ message: "Arviointia ei voi poistaa"});
  }
};


exports.findStudentPerformances = async (req, res) => {
  try {
    const data = await Arviointi.getStudentPerformances(req.params.opiskelijaId);
    if (data.length === 0) {
      res.status(404).send({ message: `ei loydy.` });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({ message: "virhe " + err.message });
  }
};