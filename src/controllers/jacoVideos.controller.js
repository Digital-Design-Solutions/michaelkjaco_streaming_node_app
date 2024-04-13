const JacoVideos = require("../models/jacoVideos.model");
const VideoSpeakerMapping = require("../models/videoSpeakerMapping.model");

exports.fetchGalleryVideos = (req, res) => {
  JacoVideos.fetchGalleryAPI((err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      JacoVideos.fetchIWCHelpVideo((error, responseData) => {
        if (error) {
          const finalData = {
            ...data,
            iwcVideoHelpCenter: [],
          };
          res.status(201).send({
            status: "success",
            data: finalData,
          });
        } else {
          const finalData = {
            ...data,
            iwcVideoHelpCenter: responseData,
          };
          res.status(201).send({
            status: "success",
            data: finalData,
          });
        }
      });
    }
  });
};

exports.getVideosByCollectionName = (req, res) => {
  const queryParams = {
    pageNo: parseInt(req.body.pageNo),
    limit: parseInt(req.body.limit),
    collectionName: req.body.collectionName,
  };
  console.log("queryParams", queryParams);
  JacoVideos.getVideosByCollectionName(queryParams, (err, data) => {
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

exports.listVideos = (req, res) => {
  const queryParams = {
    pageNo: parseInt(req.query.pageNo),
    limit: parseInt(req.query.limit),
  };
  JacoVideos.getAllVideos(queryParams, (err, data) => {
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

exports.addVideos = (req, res) => {
  const payload = req.body;
  JacoVideos.addVideo(payload, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      res.status(201).send({ status: "success" });
      // const videoSpeaker = {
      //   video_id: payload.video_id,
      //   speaker_id: payload.speaker_id,
      // };
      // VideoSpeakerMapping.create(videoSpeaker, (error, vsmData) => {
      //   if (err) {
      //     res.status(500).send({
      //       status: "error",
      //       message: err.message,
      //     });
      //   } else {
      //     res.status(201).send({ status: "success" });
      //   }
      // });
    }
  });
};

exports.searchVideos = (req, res) => {
  JacoVideos.searchVideos(req.query.searchQuery, (err, data) => {
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

exports.fetchSocialVideos = (req, res) => {
  JacoVideos.fetchSocialVideos((err, data) => {
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

exports.getLastVideo = (req, res) => {
  JacoVideos.getLastVideo((err, data) => {
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
