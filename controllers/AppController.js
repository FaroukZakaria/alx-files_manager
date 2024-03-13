const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class AppController {
  static async getStatus(req, res) {
    const redisIsAlive = redisClient.isAlive();
    const dbIsAlive = dbClient.isAlive();

    if (redisIsAlive && dbIsAlive) {
      return res.status(200).json({ redis: true, db: true });
    }
    return res.status(500).json({ redis: false, db: false });
  }

  static async getStats(req, res) {
    try {
      const nbUsers = await dbClient.nbUsers();
      const nbFiles = await dbClient.nbFiles();
      return res.status(200).json({ users: nbUsers, files: nbFiles });
    } catch (error) {
      console.error('Error getting stats:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = AppController;
