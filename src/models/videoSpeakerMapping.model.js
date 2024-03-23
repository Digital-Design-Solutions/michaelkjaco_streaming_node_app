const db = require("../config/db.config");
const {
  createNewVideoSpeakerMapping: createNewVideoSpeakerMappingQuery,
  getVideoSpeakerMappingByUserId: getVideoSpeakerMappingByUserIdQuery,
} = require("../database/queries");
const { logger } = require("../utils/logger");

class VideoSpeakerMapping {
  constructor(video_id, speaker_id) {
    this.video_id = video_id;
    this.speaker_id = speaker_id;
  }

  static create(videoSpeaker, cb) {
    db.query(
      createNewVideoSpeakerMappingQuery,
      [videoSpeaker.video_id, videoSpeaker.speaker_id],
      (err, res) => {
        if (err) {
          logger.error(err.message);
          cb(err, null);
          return;
        }
        cb(null, {
          video_speaker_id: res.video_speaker_id,
        });
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
}

module.exports = VideoSpeakerMapping;
