module.exports = app => {
  const arvioinnit = require("../controllers/arviointi.controller.js");
  var router = require("express").Router();

  // uusi Arviointi
  router.post("/", arvioinnit.create);

  // kaikki Arvioinnit
  router.get("/", arvioinnit.findAll);

  // etsi arviointi
  router.get("/:id", arvioinnit.findOne);

  // paivita arviointeja
  router.put("/:id", arvioinnit.update);

  // poista Arviointi 
  router.delete("/:id", arvioinnit.delete);

  // etsi opiskelijan tietoja
  router.get("/opiskelija/:opiskelijaId/suoritukset", arvioinnit.findStudentPerformances);

  app.use('/api/arvioinnit', router);
};