const connection = require('../connection/conn');

module.exports = {
  getProducts: async () => {
    const query = 'SELECT l.id, l.location, p.qty AS quantity, p.name AS product FROM _products p, _locations l WHERE p.location_id = l.id';
    const [values] = await connection.promise().query(query);
    return values;
  },

  getProductByLocationId: async (locationId) => {
    const query = 'SELECT * FROM _products p, _locations l WHERE p.location_id = l.id AND p.location_id = ?';
    const [values] = await connection.promise().query(query, [locationId]);

    return values;
  },

  updateProduct: async (product) => {
    const query = 'UPDATE _products SET qty = qty + ?, updated_at=? WHERE location_id=?';
    await connection.promise().query(query, [product.adjustment, new Date(), product.location_id]);
  },

  insertProduct: async (product) => {
    const query = "INSERT INTO _products VALUE('', ?, ?, ?, ?, ?)";
    await connection.promise().query(query, [product.name, product.qty, product.location_id, new Date(), new Date()]);
  },

  insertLocation: async (location) => {
    const query = "INSERT INTO _locations VALUE('', ?)";
    await connection.promise().query(query, [location.location]);
  },
};
