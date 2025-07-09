require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// json 
app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Opintorekisteri Appi." });
});

//tietueet
require("./src/routes/opiskelija.routes")(app);
require("./src/routes/opintojakso.routes")(app);
require("./src/routes/arviointi.routes")(app);

// Portti
app.listen(PORT, () => {
  console.log(`Serveri portti ${PORT}.`);
});
