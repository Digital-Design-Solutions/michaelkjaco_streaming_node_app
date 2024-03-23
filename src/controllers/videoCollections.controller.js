const VideoCollections = require("../models/videoCollections.model");

exports.listCollections = (req, res) => {
  VideoCollections.getAllCollections((err, data) => {
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

exports.addCollection = (payload, cb) => {
  VideoCollections.addCollection(payload, (err) => {
    if (err) {
      cb(err, null);
    } else {
      res.status(201).send({ status: "success" });
    }
  });
};
