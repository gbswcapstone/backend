const db = require("../config/db");

class BoardStorage {
  static getBoardAllData() {
    return new Promise((reslove, reject) => {
      const query = "SELECT * FROM board";
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        reslove(data);
      });
    });
  }

  static insertBoardData(info) {
    return new Promise((reslove, reject) => {
      const query =
        "INSERT INTO board (title, content, writer_id) VALUES (?, ?, ?)";
      db.query(
        query,
        [info.title, info.content, info.writer_id],
        (err, data) => {
          if (err) reject(`${err}`);
          reslove({ sucess: true });
        }
      );
    });
  }
}

module.exports = BoardStorage;
