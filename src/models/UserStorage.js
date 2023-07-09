const db = require("../config/db");
const crypto = require("crypto");

class UserStorage {
  static getUserInfo(id) {
    return new Promise((reslove, reject) => {
      const query = "SELECT * FROM users WHERE id = ?;";
      db.query(query, id, (err, data) => {
        if (err) reject(`${err}`);
        reslove(data[0]);
      });
    });
  }

  static async save(userInfo) {
    return new Promise((reslove, reject) => {
      const salt = crypto.randomBytes(128).toString("base64");
      const hashPassword = crypto
        .createHash("sha512")
        .update(userInfo.password + salt)
        .digest("hex");
      const query =
        "INSERT INTO users (id, password, name, tel, salt) VALUES (?, ?, ?, ?, ?);";
      db.query(
        query,
        [userInfo.id, hashPassword, userInfo.name, userInfo.tel, salt],
        (err) => {
          if (err) reject(`${err}`);
          reslove({ success: true });
        }
      );
    });
  }
}

module.exports = UserStorage;
