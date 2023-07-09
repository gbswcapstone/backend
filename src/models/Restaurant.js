const RestaurantStorage = require("./RestaurantStorage");

class Restaurant {
  constructor(req) {
    this.req = req;
  }

  async get() {
    try {
      const data = await RestaurantStorage.getRestaurant();
      return { success: true, data };
    } catch (err) {
      return { success: false, msg: "다시 시도해주세요" };
    }
  }
}

module.exports = Restaurant;
