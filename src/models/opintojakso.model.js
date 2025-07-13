const sql = require('../utils/db');

const Opintojakso = function(opintojakso) {
  this.nimi = opintojakso.nimi;
  this.laajuus_op = opintojakso.laajuus_op;
  this.kuvaus = opintojakso.kuvaus;
};

Opintojakso.create = async (newOpintojakso) => {
  const [result] = await sql.execute(
    "INSERT INTO Opintojakso (nimi, laajuus_op, kuvaus) VALUES (?, ?, ?)",
    [newOpintojakso.nimi, newOpintojakso.laajuus_op, newOpintojakso.kuvaus]
  );
  return { opintojakso_id: result.insertId, ...newOpintojakso };
};
Opintojakso.findById = async (id) => {
  const [rows] = await sql.execute("SELECT * FROM Opintojakso WHERE opintojakso_id = ?", [id]);
  return rows[0];
};

Opintojakso.getAll = async () => {
  const [rows] = await sql.execute("SELECT * FROM Opintojakso");
  return rows;
};

Opintojakso.updateById = async (id, opintojakso) => {
  const [result] = await sql.execute(
    "UPDATE Opintojakso SET nimi = ?, laajuus_op = ?, kuvaus = ? WHERE opintojakso_id = ?",
    [opintojakso.nimi, opintojakso.laajuus_op, opintojakso.kuvaus, id]
  );
  if (result.affectedRows === 0) {
    return null; 
  }
  return { opintojakso_id: id, ...opintojakso };
};

Opintojakso.remove = async (id) => {
  const [result] = await sql.execute("DELETE FROM Opintojakso WHERE opintojakso_id = ?", [id]);
  return result.affectedRows;
};

module.exports = Opintojakso;