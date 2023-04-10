const BoardStorage = require("./BoardStorage");

class Board {
  constructor(body) {
    this.body = body;
  }

  async getBoard() {
    const client = this.body;
    try {
      const response = await BoardStorage.getBoardAllData();
      return {
        success: true,
        data: response,
      };
    } catch (err) {
      return {
        success: false,
        msg: err,
      };
    }
  }
}

module.exports = Board;
