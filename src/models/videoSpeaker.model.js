const db = require("../config/db.config");
const {
  addSpeaker: addSpeakerQuery,
  getAllSpeakers: getAllSpeakersSpeaker,
} = require("../database/queries");
const { logger } = require("../utils/logger");

class VideoSpeaker {
  constructor(speaker_name) {
    this.speaker_name = speaker_name;
  }

  static addSpeaker(newSpeaker, cb) {
    db.query(addSpeakerQuery, [newSpeaker.speaker_name], (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      cb(null);
    });
  }

  static getAllSpeakers(cb) {
    db.query(getAllSpeakersSpeaker, (err, res) => {
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

module.exports = VideoSpeaker;
