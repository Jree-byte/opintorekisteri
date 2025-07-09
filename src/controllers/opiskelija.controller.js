const Opiskelija = require('../models/opiskelija.model');

// Luo ja tallenna uusi opiskelija
exports.create = async (req, res) => {
  
  if (!req.body.etunimi || !req.body.sukunimi || !req.body.syntymaaika || !req.body.email) {
    
    return res.status(400).send({ message: "Etunimi, sukunimi, syntymäaika ja email ovat pakollisia kenttiä!" });
  }

  
  const newOpiskelija = {
    etunimi: req.body.etunimi,
    sukunimi: req.body.sukunimi,
    syntymaaika: req.body.syntymaaika,
    email: req.body.email,
  };

  try {
    const data = await Opiskelija.create(newOpiskelija);
    res.status(201).send(data); 
  } catch (err) {
    
    if (err.message.includes('Duplicate entry') && err.message.includes('for key \'email\'')) {
      res.status(409).send({ message: "Sähköposti on jo käytössä. Valitse toinen sähköposti." }); // 409 Conflict
    } else {
      res.status(500).send({ message: err.message || "Virhe luotaessa opiskelijaa." }); // 500 Internal Server Error
    }
  }
};

// Hae kaikki opiskelijat tietokannasta
exports.findAll = async (req, res) => {
  try {
    const data = await Opiskelija.getAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || "Virhe haettaessa opiskelijoita." });
  }
};

// Hae yksittäinen opiskelija ID:llä
exports.findOne = async (req, res) => {
  try {
    const data = await Opiskelija.findById(req.params.id);
    if (!data) {
      res.status(404).send({ message: `Opiskelijaa ID:llä ${req.params.id} ei löytynyt.` }); // 404 Not Found
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({ message: "Virhe haettaessa opiskelijaa ID:llä " + req.params.id });
  }
};

// Päivitä opiskelija ID:llä
exports.update = async (req, res) => {
  
  if (!req.body.etunimi || !req.body.sukunimi || !req.body.syntymaaika || !req.body.email) {
    return res.status(400).send({ message: "Etunimi, sukunimi, syntymäaika ja email ovat pakollisia kenttiä päivityksessä!" });
  }

  try {
    const data = await Opiskelija.updateById(req.params.id, req.body);
    
    res.send({ message: `Opiskelija ${req.params.id} päivitetty onnistuneesti.`, updated_data: data });
  } catch (err) {
    if (err.message.includes(`Opiskelijaa ID:llä ${req.params.id} ei löytynyt.`)) {
      res.status(404).send({ message: err.message }); // 404 Not Found
    } else {
      res.status(500).send({ message: "Virhe päivittäessä opiskelijaa ID:llä " + req.params.id + ": " + err.message });
    }
  }
};

// Poista opiskelija ID:llä
exports.delete = async (req, res) => {
  try {
    await Opiskelija.remove(req.params.id);
    res.status(204).send({ message: "Opiskelija poistettu onnistuneesti!" }); // 204 No Content
  } catch (err) {
    if (err.message.includes(`Opiskelijaa ID:llä ${req.params.id} ei löytynyt.`)) {
      res.status(404).send({ message: err.message }); // 404 Not Found
    } else {
      res.status(500).send({ message: "Virhe poistaessa opiskelijaa ID:llä " + req.params.id });
    }
  }
};