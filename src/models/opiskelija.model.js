const sql = require('../utils/db');


// Vastaa tietokannan Opiskelija-taulun rakennetta
const Opiskelija = function(opiskelija) {
  this.etunimi = opiskelija.etunimi;
  this.sukunimi = opiskelija.sukunimi;
  this.syntymaaika = opiskelija.syntymaaika;
  this.email = opiskelija.email;
};

// Luo uusi opiskelija (CREATE-operaatio)
Opiskelija.create = async (newOpiskelija) => {
  try {
    const [result] = await sql.execute(
      "INSERT INTO Opiskelija (etunimi, sukunimi, syntymaaika, email) VALUES (?, ?, ?, ?)",
      [newOpiskelija.etunimi, newOpiskelija.sukunimi, newOpiskelija.syntymaaika, newOpiskelija.email]
    );
    return { opiskelija_id: result.insertId, ...newOpiskelija };
  } catch (err) {
    throw err;
  }
};

// Hae kaikki opiskelijat (READ-operaatio)
Opiskelija.getAll = async () => {
  try {
    const [rows] = await sql.execute("SELECT * FROM Opiskelija");
    return rows;
  } catch (err) {
    throw err;
  }
};

// Hae opiskelija ID:llä (READ-operaatio)
Opiskelija.findById = async (id) => {
  try {
    const [rows] = await sql.execute("SELECT * FROM Opiskelija WHERE opiskelija_id = ?", [id]);
    if (rows.length === 0) {
      return null; // Opiskelijaa ei löytynyt
    }
    return rows[0];
  } catch (err) {
    throw err;
  }
};

// Päivitä opiskelija ID:llä (UPDATE-operaatio)
Opiskelija.updateById = async (id, opiskelija) => {
  try {
    const [result] = await sql.execute(
      "UPDATE Opiskelija SET etunimi = ?, sukunimi = ?, syntymaaika = ?, email = ? WHERE opiskelija_id = ?",
      [opiskelija.etunimi, opiskelija.sukunimi, opiskelija.syntymaaika, opiskelija.email, id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`Opiskelijaa ID:llä ${id} ei löytynyt.`);
    }
    return { id: parseInt(id), ...opiskelija };
  } catch (err) {
    throw err;
  }
};

// Poista opiskelija ID:llä (DELETE-operaatio)
Opiskelija.remove = async (id) => {
  try {
    const [result] = await sql.execute("DELETE FROM Opiskelija WHERE opiskelija_id = ?", [id]);
    if (result.affectedRows === 0) {
      throw new Error(`Opiskelijaa ID:llä ${id} ei löytynyt.`);
    }
    return true; // Poisto onnistui
  } catch (err) {
    throw err;
  }
};

module.exports = Opiskelija;