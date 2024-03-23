const db = require("../config/db.config");
const {
  addCollection: addCollectionQuery,
  getAllCollections: getAllCollectionsQuery,
} = require("../database/queries");
const { logger } = require("../utils/logger");

class VideoCollections {
  constructor(collection_name) {
    this.collection_name = collection_name;
  }

  static AddCollection(newCollection, cb) {
    db.query(addCategoryQuery, [newCollection.collection_name], (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      cb(null);
    });
  }

  static getAllCollections(cb) {
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

module.exports = VideoCollections;
