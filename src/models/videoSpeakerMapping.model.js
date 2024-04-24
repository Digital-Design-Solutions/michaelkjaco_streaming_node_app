const db = require("../config/db.config");
const {
  createNewVideoSpeakerMapping: createNewVideoSpeakerMappingQuery,
  getVideoSpeakerMappingByUserId: getVideoSpeakerMappingByUserIdQuery,
  deleteVideoSpeakerMappingByVideoId: deleteVideoSpeakerMappingByVideoIdQuery,
} = require("../database/queries");
const { logger } = require("../utils/logger");

class VideoSpeakerMapping {
  constructor(video_id, speaker_id) {
    this.video_id = video_id;
    this.speaker_id = speaker_id;
  }

  static createVideoSpeakerMapping(videoSpeaker, cb) {
    db.query(
      createNewVideoSpeakerMappingQuery,
      [videoSpeaker.video_id, videoSpeaker.speaker_id],
      (err, res) => {
        if (err) {
          logger.error(err.message);
          cb(err, null);
          return;
        }
        cb(null, true);
      }
    );
  }

  static getVideoSpeakerMappingByUserId(video_id, cb) {
    db.query(getVideoSpeakerMappingByUserIdQuery, video_id, (err, res) => {
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

  static deleteMapping(video_id, cb) {
    db.query(
      deleteVideoSpeakerMappingByVideoIdQuery,
      [video_id],
      (err, res) => {
        if (err) {
          logger.error(err.message);
          cb(err, null);
          return;
        }
        cb(null, true);
      }
    );
  }
}

module.exports = VideoSpeakerMapping;
