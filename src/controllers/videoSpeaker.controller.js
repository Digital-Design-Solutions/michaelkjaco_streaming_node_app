const VideoSpeakers = require("../models/videoSpeaker.model");

exports.listSpeakers = (req, res) => {
  VideoSpeakers.getAllSpeakers((err, data) => {
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

exports.addSpeaker = (payload, cb) => {
  VideoSpeakers.addSpeaker(payload, (err) => {
    if (err) {
      cb(err, null);
    } else {
      res.status(201).send({ status: "success" });
    }
  });
};
