const db = require("../config/db.config");
const {
  addNotification: addNotificationQuery,
  getAllCategories: getAllCategoriesQuery,
  getAllNOtifications:getAllNotificationsQuery
} = require("../database/queries");
const { logger } = require("../utils/logger");



class Notification {
  
    static addNotification(body, cb) {
      db.query(addNotificationQuery, [body.notification, body.notification_type,body.start_date,body.end_date,body.status], (err, res) => {
        if (err) {
          logger.error(err.message);
          cb(err, null);
          return;
        }
        cb(null);
      });
    }
  
    static getAllNotifications(cb) {
      db.query(getAllNotificationsQuery, (err, res) => {
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
  
  module.exports = Notification;
  