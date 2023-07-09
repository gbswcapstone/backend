const db = require("../config/db");

class FestivalStorage {
  static async getFestival() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM festivals";
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}

module.exports = FestivalStorage;
