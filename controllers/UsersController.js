const dbClient = require('../utils/db');
const sha1 = require('sha1');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      // Check if email already exists
      const existingUser = await dbClient.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Already exists' });
      }

      // Hash password
      const hashedPassword = sha1(password);

      // Create new user
      const newUser = await dbClient.createUser({ email, password: hashedPassword });

      // Return new user
      return res.status(201).json({ email: newUser.email, id: newUser._id });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UsersController;
