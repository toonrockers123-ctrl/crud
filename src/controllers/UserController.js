const User = require('../models/User');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.getAll();
      res.status(200).json({
        success: true,
        data: users,
        message: 'Users retrieved successfully'
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving users',
        error: err.message
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.getById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: user,
        message: 'User retrieved successfully'
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving user',
        error: err.message
      });
    }
  }

  static async createUser(req, res) {
    try {
      const { name, email, phone, address } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({
          success: false,
          message: 'Name and email are required'
        });
      }
      
      const newUser = await User.create(name, email, phone || null, address || null);
      
      res.status(201).json({
        success: true,
        data: newUser,
        message: 'User created successfully'
      });
    } catch (err) {
      if (err.code === '23505') {
        return res.status(409).json({
          success: false,
          message: 'Email already exists'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error creating user',
        error: err.message
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, phone, address } = req.body;
      
      const user = await User.getById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      const updatedUser = await User.update(
        id,
        name || user.name,
        email || user.email,
        phone || user.phone,
        address || user.address
      );
      
      res.status(200).json({
        success: true,
        data: updatedUser,
        message: 'User updated successfully'
      });
    } catch (err) {
      if (err.code === '23505') {
        return res.status(409).json({
          success: false,
          message: 'Email already exists'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error updating user',
        error: err.message
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      
      const user = await User.getById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      await User.delete(id);
      
      res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error deleting user',
        error: err.message
      });
    }
  }
}

module.exports = UserController;
