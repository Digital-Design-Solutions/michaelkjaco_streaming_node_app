const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { httpLogStream } = require("./utils/logger");
const jacoVideosRoute = require("./routes/jacoVideos.route");
const videoCategoryRoute = require("./routes/videoCategory.route");
const videoSpeakerRoute = require("./routes/videoSpeaker.route");
const videoCollectionRoute = require("./routes/videoCollections.route");
const googleCalendarCollectionRoute = require("./routes/googleCalendar.route");
const notificationCollectionRoute = require("./routes/notifications.route");

const app = express();


app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ limit: '100mb',extended: false }));
app.use(morgan("dev"));
app.use(morgan("combined", { stream: httpLogStream }));
app.use(cors());

app.use("/api/video", jacoVideosRoute);
app.use("/api/videoCategory", videoCategoryRoute);
app.use("/api/videoSpeaker", videoSpeakerRoute);
app.use("/api/videoCollection", videoCollectionRoute);
app.use("/api/events", googleCalendarCollectionRoute);
app.use("/api/notification", notificationCollectionRoute);

// Configure AWS SDK with your credentials and region
// AWS.config.update({
//   region: "your-region",
//   accessKeyId: "your-access-key-id",
//   secretAccessKey: "your-secret-access-key",
// });

// Create Kinesis client
// const kinesis = new AWS.Kinesis();

app.get("/", async (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      message: "API working fine",
    },
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});

module.exports = app;
