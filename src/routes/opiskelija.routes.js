module.exports = app => {
  const opiskelijat = require("../controllers/opiskelija.controller.js");
  var router = require("express").Router();

  // Lisaa opiskelija
  router.post("/", opiskelijat.create);

  // Kaikki opiskelijat
  router.get("/", opiskelijat.findAll);

  // Etsi opiskelija
  router.get("/:id", opiskelijat.findOne);

  // Paivita opiskelijan tietoja
  router.put("/:id", opiskelijat.update);

  // poista opiskelija
  router.delete("/:id", opiskelijat.delete);

  app.use('/api/opiskelijat', router);
};