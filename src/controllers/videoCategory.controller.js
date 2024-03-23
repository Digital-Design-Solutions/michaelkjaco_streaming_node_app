const VideoCategories = require("../models/videoCategory.model");

exports.listCategories = (req, res) => {
  VideoCategories.getAllCategories((err, data) => {
    if (err) {
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

exports.addCategory = (payload, cb) => {
  VideoCategories.addCategory(payload, (err) => {
    if (err) {
      cb(err, null);
    } else {
      res.status(201).send({ status: "success" });
    }
  });
};
