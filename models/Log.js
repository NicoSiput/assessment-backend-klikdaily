const connection = require('../connection/conn');

module.exports = {
  getLogs: async () => {
    const query = 'SELECT l.id, l.location, p.qty AS quantity, p.name AS product FROM _products p, _locations l WHERE p.location_id = l.id';
    const [values] = await connection.promise().query(query);
    return values;
  },
  getLogsByLocationId: async (locationId) => {
    query = 'SELECT * FROM _logs WHERE location_id=? ORDER BY id DESC';
    const [values] = await connection.promise().query(query, [locationId]);
    return values;
  },

  insertLog: async (log) => {
    query = "INSERT INTO _logs VALUES('', ?, ?, ?, ?, ?)";
    const [values] = await connection.promise().query(query, [
      log.typeAdjustment,
      log.adjustment,
      log.currentStock,
      log.location_id,
      new Date(),
    ]);

    return values;
  },
};
