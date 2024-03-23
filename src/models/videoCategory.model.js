const db = require("../config/db.config");
const {
  addCategory: addCategoryQuery,
  getAllCategories: getAllCategoriesQuery,
} = require("../database/queries");
const { logger } = require("../utils/logger");

class VideoCategory {
  constructor(category_name) {
    this.category_name = category_name;
  }

  static addVideo(newCategory, cb) {
    db.query(addCategoryQuery, [newCategory.category_name], (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      cb(null);
    });
  }

  static getAllCategories(cb) {
    db.query(getAllCategoriesQuery, (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      if (res.length) {
        cb(null, res);
        return;
      }
      cb({ kind: "not_found" }, null);
    });
  }
}

module.exports = VideoCategory;
