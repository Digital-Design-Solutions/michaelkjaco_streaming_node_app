const JacoVideos = require("../models/jacoVideos.model");

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

exports.wildSearchVideos = (req, res) => {
  const payload = {
    collectionName: req.body.collectionName,
    categoryName: req.body.categoryName,
    newTitle: req.body.newTitle,
  };
  JacoVideos.wildSearchVideos(payload, (err, data) => {
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

exports.getVideoDetailsById = (req, res) => {
  JacoVideos.getVideoDetailsById(req.query.video_id, (err, data) => {
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

exports.updateVideoById = (req, res) => {
  JacoVideos.updateVideoById(req.body, (err) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      res.status(201).send({ status: "success" });
    }
  });
};
