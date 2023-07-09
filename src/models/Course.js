const CourseStorage = require("./CourseStorage");

class Course {
  constructor(req) {
    this.req = req;
  }

  async get() {
    try {
      const data = await CourseStorage.getCourse();
      return { success: true, data };
    } catch (err) {
      return { success: false, msg: "다시 시도해주세요" };
    }
  }

  async getSteps() {
    try {
      const data = await CourseStorage.getSteps(this.req.params.idx);
      return { success: true, data };
    } catch (err) {
      return { success: false, msg: "다시 시도해주세요" };
    }
  }
}

module.exports = Course;
