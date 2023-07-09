const FestivalStorage = require("./FestivalStorage");

class Festival {
  constructor(req) {
    this.req = req;
  }

  async get() {
    try {
      const data = await FestivalStorage.getFestival();
      return { success: true, data };
    } catch (err) {
      return { success: false, msg: "다시 시도해주세요" };
    }
  }
}

module.exports = Festival;
