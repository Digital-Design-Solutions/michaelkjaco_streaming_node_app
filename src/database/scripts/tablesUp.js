const { logger } = require("../../utils/logger");
const {
  createTableCategories: createTableCategoriesQuery,
  createTableCollections: createTableCollectionsQuery,
  createTableSpeakers: createTableSpeakersQuery,
  createTableVideoSpeakerMapping: createTableVideoSpeakerMappingQuery,
  createTableVideo: createTableVideoQuery,
} = require("../queries");
(() => {
  require("../../config/db.config").query(createTableVideoQuery, (err, _) => {
    if (err) {
      logger.error(err.message);
      return;
    }
    logger.info("Table Videos created!");
    process.exit(0);
  });
  require("../../config/db.config").query(
    createTableCategoriesQuery,
    (err, _) => {
      if (err) {
        logger.error(err.message);
        return;
      }
      logger.info("Table Categories created!");
      process.exit(0);
    }
  );
  require("../../config/db.config").query(
    createTableCollectionsQuery,
    (err, _) => {
      if (err) {
        logger.error(err.message);
        return;
      }
      logger.info("Table Collections created!");
      process.exit(0);
    }
  );
  require("../../config/db.config").query(
    createTableSpeakersQuery,
    (err, _) => {
      if (err) {
        logger.error(err.message);
        return;
      }
      logger.info("Table Speakers created!");
      process.exit(0);
    }
  );
  require("../../config/db.config").query(
    createTableVideoSpeakerMappingQuery,
    (err, _) => {
      if (err) {
        logger.error(err.message);
        return;
      }
      logger.info("Table Video Speaker Mapping created!");
      process.exit(0);
    }
  );
})();
