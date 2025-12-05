const pool = require('../config/database');

class User {
  static async getAll() {
    try {
      const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(name, email, phone, address) {
    try {
      const result = await pool.query(
        'INSERT INTO users (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, phone, address]
      );
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  static async update(id, name, email, phone, address) {
    try {
      const result = await pool.query(
        'UPDATE users SET name = $1, email = $2, phone = $3, address = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
        [name, email, phone, address, id]
      );
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
