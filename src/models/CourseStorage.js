const db = require("../config/db");

class CourseStorage {
  static async getCourse() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM courses";
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }

  static async getSteps(idx) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM steps WHERE course = ? ORDER BY round";
      db.query(query, idx, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}

module.exports = CourseStorage;
