const JacoVideos = require("../models/jacoVideos.model");
const VideoSpeakerMapping = require("../models/videoSpeakerMapping.model");

exports.listVideos = (req, res) => {
  JacoVideos.getAllVideos((err, data) => {
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

exports.addVideos = (payload, cb) => {
  JacoVideos.addVideo(payload, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      const videoSpeaker = {
        video_id: payload.video_id,
        speaker_id: 1,
      };
      VideoSpeakerMapping.create(videoSpeaker, (error, vsmData) => {
        if (err) {
          cb(err, null);
        } else {
          res.status(201).send({ status: "success" });
        }
      });
    }
  });
};
