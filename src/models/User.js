const UserStorage = require("./UserStorage");
const bcrypt = require("bcrypt");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    const user = await UserStorage.getUserInfo(client.id);
    try {
      if (user) {
        if (
          user.id === client.id &&
          bcrypt.compareSync(client.password, user.password)
        ) {
          return {
            success: true,
            name: user.name,
            id: user.id,
            isAdmin: user.isAdmin,
          };
        }
      }
      return { success: false, msg: "다시 입력해주세요." };
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return {
        success: false,
        msg: err,
      };
    }
  }
}

module.exports = User;
