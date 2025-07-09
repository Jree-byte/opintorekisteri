module.exports = app => {
  const opintojaksot = require("../controllers/opintojakso.controller.js");
  var router = require("express").Router();

  // uusi opiontojakso
  router.post("/", opintojaksot.create);

  // kaikki Opintojaksot
  router.get("/", opintojaksot.findAll);

  // etsi opintojakso
  router.get("/:id", opintojaksot.findOne);

  // paivita opintojakson tietoja
  router.put("/:id", opintojaksot.update);

  // poista opintojakso
  router.delete("/:id", opintojaksot.delete);

  app.use('/api/opintojaksot', router);
};