const db = require("../config/db");

class RestaurantStorage {
  static async getRestaurant() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM restaurants";
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}

module.exports = RestaurantStorage;
