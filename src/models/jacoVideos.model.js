const db = require("../config/db.config");
const {
  addNewVideo: addNewVideoQuery,
  getAllVideos: getAllVideosQuery,
  getVideosByCollectionName: getVideosByCollectionNameQuery,
  getVideoByCollectionId: getVideoByCollectionIdQuery,
  searchVideos: searchVideosQuery,
} = require("../database/queries");
const { videoList } = require("../mockData/videos");
const { logger } = require("../utils/logger");

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
    // cb(null, videoList);
    // return;
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
  //   static getUserRoleMappingByUserId(user_id, cb) {
  //     db.query(getUserRoleMappingByUserIdQuery, user_id, (err, res) => {
  //       if (err) {
  //         logger.error(err.message);
  //         cb(err, null);
  //         return;
  //       }
  //       if (res.length) {
  //         cb(null, res);
  //         return;
  //       }
  //       cb({ kind: "not_found" }, null);
  //     });
  //   }
}

module.exports = JacoVideos;
