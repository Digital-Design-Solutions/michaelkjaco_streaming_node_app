const db = require("../config/db.config");
const {
  addNewVideo: addNewVideoQuery,
  getAllVideos: getAllVideosQuery,
  getVideosByCollectionName: getVideosByCollectionNameQuery,
  getVideoByCollectionId: getVideoByCollectionIdQuery,
  searchVideos: searchVideosQuery,
  getLastVideo: getLastVideoQuery,
  wildSearchVideos: wildSearchVideosQuery,
  videoDetailsById: videoDetailsByIdQuery,
  updateVideoById: updateVideoByIdQuery,
} = require("../database/queries");
const { logger } = require("../utils/logger");
const mysql = require("mysql2/promise");
const VideoSpeakerMapping = require("./videoSpeakerMapping.model");

const pool = mysql.createPool({
  host: "iwc-testing-db.c6shtrginbef.us-east-1.rds.amazonaws.com",
  user: "mkjaco",
  password: "iwc234cwi",
  database: "jaco_iv_db",
});

class JacoVideos {
  constructor(
    video_id,
    new_title,
    synopsis,
    tags,
    release_date,
    s3_video_id,
    views,
    cover_image,
    duration,
    category_id,
    collection_id,
    availability,
    object_url,
    entity_tags
  ) {
    this.video_id = video_id;
    this.new_title = new_title;
    this.synopsis = synopsis;
    this.tags = tags;
    this.release_date = release_date;
    this.s3_video_id = s3_video_id;
    this.views = views;
    this.cover_image = cover_image;
    this.duration = duration;
    this.category_id = category_id;
    this.collection_id = collection_id;
    this.availability = availability;
    this.object_url = object_url;
    this.entity_tags = entity_tags;
  }

  static addVideo(newVideo, cb) {
    db.query(
      addNewVideoQuery,
      [
        newVideo.video_id,
        newVideo.new_title,
        newVideo.synopsis,
        newVideo.tags,
        newVideo.release_date,
        newVideo.s3_video_id,
        newVideo.views,
        newVideo.cover_image,
        newVideo.duration,
        newVideo.category_id,
        newVideo.collection_id,
        newVideo.availability,
        newVideo.object_url,
        newVideo.entity_tags,
        newVideo.title,
        newVideo.speaker_name,
      ],
      (err, res) => {
        if (err) {
          logger.error(err.message);
          cb(err, null);
          return;
        }
        cb(null, {
          user_role_id: res.insertId,
        });
      }
    );
  }

  static fetchIWCHelpVideo(cb) {
    db.query(getVideoByCollectionIdQuery, [213, 8], (err, res) => {
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

  static fetchGalleryAPI(cb) {
    db.query(getAllVideosQuery, [12, 0], (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      if (res.length) {
        db.query(getVideoByCollectionIdQuery, [195, 7], (error, data) => {
          if (error) {
            logger.error(error.message);
            const response = {
              top3: res.slice(0, 3),
              iwc: res.slice(2, 8),
              allVideos: res,
              videoCollections: [],
            };
            cb(null, response);
            return;
          }
          if (data.length) {
            const response = {
              top3: res.slice(0, 3),
              iwc: res.slice(2, 8),
              allVideos: res,
              videoCollections: data,
            };
            cb(null, response);
            return;
          }
          cb({ kind: "not_found" }, null);
        });
      }
    });
  }

  static getVideosByCollectionName(queryParams, cb) {
    const offset = queryParams.limit * queryParams.pageNo - queryParams.limit;
    db.query(
      getVideosByCollectionNameQuery,
      [queryParams.collectionName, queryParams.limit, offset],
      (err, res) => {
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
      }
    );
  }

  static getAllVideos(queryParams, cb) {
    const offset = queryParams.limit * queryParams.pageNo - queryParams.limit;
    db.query(getAllVideosQuery, [queryParams.limit, offset], (err, res) => {
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

  static searchVideos(searchQuery, cb) {
    db.query(searchVideosQuery, [searchQuery, searchQuery], (err, res) => {
      if (err) {
        console.log(err);
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

  static async fetchSocialVideos(cb) {
    const connection = await pool.getConnection();
    const query1 = connection.query(getVideoByCollectionIdQuery, [231, 10]);
    const query2 = connection.query(getVideoByCollectionIdQuery, [232, 10]);
    const query3 = connection.query(getVideoByCollectionIdQuery, [233, 10]);
    const query4 = connection.query(getVideoByCollectionIdQuery, [234, 10]);

    try {
      const [result1, result2, result3, result4] = await Promise.all([
        query1,
        query2,
        query3,
        query4,
      ]);
      const checkLength =
        result1.length > 0 ||
        result2.length > 0 ||
        result3.length > 0 ||
        result4.length > 0;
      if (checkLength) {
        const response = {
          socialIssues: result1[0] || [],
          socialMedia: result2[0] || [],
          socialMovements: result3[0] || [],
          society: result4[0] || [],
        };
        cb(null, response);
        return;
      }
      cb({ kind: "not_found" }, null);
    } catch (error) {
      logger.error(error.message);
      cb(error, null);
      return;
    }
  }

  static getLastVideo(cb) {
    db.query(getLastVideoQuery, (err, res) => {
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

  static wildSearchVideos(payload, cb) {
    db.query(
      wildSearchVideosQuery,
      [payload.collectionName, payload.categoryName, payload.newTitle],
      (err, res) => {
        if (err) {
          console.log(err);
          logger.error(err.message);
          cb(err, null);
          return;
        }
        if (res.length) {
          cb(null, res);
          return;
        } else {
          cb(null, []);
          return;
        }
      }
    );
  }

  static getVideoDetailsById(videoID, cb) {
    db.query(videoDetailsByIdQuery, [videoID], (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      if (res.length) {
        cb(null, res);
        return;
      } else {
        cb(null, []);
        return;
      }
    });
  }

  static updateVideoById(editVideo, cb) {
    db.query(
      updateVideoByIdQuery,
      [
        editVideo.new_title,
        editVideo.synopsis,
        editVideo.tags,
        editVideo.release_date,
        editVideo.s3_video_id,
        editVideo.views,
        editVideo.cover_image,
        editVideo.duration,
        editVideo.category_id,
        editVideo.collection_id,
        editVideo.availability,
        editVideo.object_url,
        editVideo.entity_tags,
        editVideo.title,
        editVideo.is_active,
        editVideo.is_deleted,
        editVideo.video_id,
      ],
      (err, res) => {
        if (err) {
          logger.error(err.message);
          cb(err, null);
          return;
        }
        VideoSpeakerMapping.deleteMapping(
          editVideo.video_id,
          (err, _response) => {
            if (err) {
              logger.error(err.message);
              cb(err, null);
              return;
            }
            editVideo.speaker_id.map((speaker_id, index) => {
              const videoSpeaker = {
                video_id: editVideo.video_id,
                speaker_id: speaker_id,
              };
              VideoSpeakerMapping.createVideoSpeakerMapping(
                videoSpeaker,
                (err, _createStatus) => {
                  if (err) {
                    cb(err.message, null);
                  } else {
                    if (editVideo.speaker_id.length - 1 === index) {
                      cb(null, {});
                    }
                  }
                }
              );
            });
          }
        );
      }
    );
  }
}

module.exports = JacoVideos;
