const sql = require('../utils/db');

const Arviointi = function(arviointi) {
  this.opiskelija_id = arviointi.opiskelija_id;
  this.opintojakso_id = arviointi.opintojakso_id;
  this.arvosana = arviointi.arvosana;
  this.paivamaara = arviointi.paivamaara;
};

Arviointi.create = async (newArviointi) => {
  const [result] = await sql.execute(
    "INSERT INTO Arviointi (opiskelija_id, opintojakso_id, arvosana, paivamaara) VALUES (?, ?, ?, ?)",
    [newArviointi.opiskelija_id, newArviointi.opintojakso_id, newArviointi.arvosana, newArviointi.paivamaara]
  );
  return { arviointi_id: result.insertId, ...newArviointi };
};

Arviointi.findById = async (id) => {
  const [rows] = await sql.execute("SELECT * FROM Arviointi WHERE arviointi_id = ?", [id]);
  return rows[0];
};

Arviointi.getAll = async () => {
  const [rows] = await sql.execute("SELECT * FROM Arviointi");
  return rows;
};

Arviointi.updateById = async (id, arviointi) => {
  const [result] = await sql.execute(
    "UPDATE Arviointi SET opiskelija_id = ?, opintojakso_id = ?, arvosana = ?, paivamaara = ? WHERE arviointi_id = ?",
    [arviointi.opiskelija_id, arviointi.opintojakso_id, arviointi.arvosana, arviointi.paivamaara, id]
  );
  if (result.affectedRows === 0) {
    return null; 
  }
  return { arviointi_id: id, ...arviointi };
};

Arviointi.remove = async (id) => {
  const [result] = await sql.execute("DELETE FROM Arviointi WHERE arviointi_id = ?", [id]);
  return result.affectedRows;
};

// Aliohjelman kutsu
Arviointi.getStudentPerformances = async (opiskelijaId) => {
  const [rows] = await sql.execute("CALL HaeOpiskelijanSuoritukset(?)", [opiskelijaId]);
  
  return rows[0];
};

module.exports = Arviointi;