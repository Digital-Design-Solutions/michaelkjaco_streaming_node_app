const Notification = require("../models/notification.model");

exports.listNotification = (req, res) => {
  Notification.getAllNotifications((err, data) => {
    if (err) {
        console.log(err)
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      res.status(201).send({
        status: "success",
        data,
      });
    }
  });
};


exports.addNotification = (req, res) => {
  Notification.addNotification(req.body, (err) => {
    if (err) {
      cb(err, null);
    } else {
      res.status(201).send({ status: "success" });
    }
  });
};