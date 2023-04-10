const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class UserStorage {
  static getUserInfo(id) {
    return new Promise((reslove, reject) => {
      const query = "SELECT * FROM users WHERE id = ?;";
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        reslove(data[0]);
      });
    });
  }

  static async save(userInfo) {
    return new Promise((reslove, reject) => {
      const hashpwd = bcrypt.hashSync(userInfo.password, saltRounds);
      const query = "INSERT INTO users (id, name, password) VALUES (?, ?, ?);";
      db.query(query, [userInfo.id, userInfo.name, hashpwd], (err) => {
        if (err) reject(`${err}`);
        reslove({ success: true });
      });
    });
  }
}

module.exports = UserStorage;
