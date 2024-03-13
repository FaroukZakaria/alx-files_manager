const redis = require('redis');

class RedisClient {
  constructor() {
    // Create a client to Redis
    this.client = redis.createClient();

    // Handle errors
    this.client.on('error', (error) => {
      console.error('Redis error:', error);
    });
  }

  // Check if the connection to Redis is alive
  isAlive() {
    return this.client.connected;
  }

  // Get value from Redis by key
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  // Set value in Redis with expiration
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  // Delete value from Redis by key
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
