const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const mysql = require("mysql2");
const fs = require("fs");
const aws = require("aws-sdk");
const AWS = require("@aws-sdk/client-s3");
const { httpLogStream } = require("./utils/logger");
const {
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY_ID,
  BUCKET_KEY,
  BUCKET_NAME,
  AWS_REGION,
} = require("./utils/secrets");

// Set the region
aws.config.update({ region: AWS_REGION });

const config = {
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
};

const s3 = new aws.S3(config);

// Define parameters for getting object information
const bucketName = BUCKET_NAME;
const key = BUCKET_KEY;

const params = {
  Bucket: bucketName,
  Key: key,
};

const jacoVideosRoute = require("./routes/jacoVideos.route");
const videoCategoryRoute = require("./routes/videoCategory.route");
const videoSpeakerRoute = require("./routes/videoSpeaker.route");
const videoCollectionRoute = require("./routes/videoCollections.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(morgan("combined", { stream: httpLogStream }));
app.use(cors());

app.use("/api/video", jacoVideosRoute);
app.use("/api/videoCategory", videoCategoryRoute);
app.use("/api/videoSpeaker", videoSpeakerRoute);
app.use("/api/videoCollection", videoCollectionRoute);

// Configure AWS SDK with your credentials and region
// AWS.config.update({
//   region: "your-region",
//   accessKeyId: "your-access-key-id",
//   secretAccessKey: "your-secret-access-key",
// });

// Create Kinesis client
// const kinesis = new AWS.Kinesis();

// RDS configuration
// const connection = mysql.createConnection({
//   host: "iwc-testing-db.c6shtrginbef.us-east-1.rds.amazonaws.com",
//   user: "mkjaco", //'viki'
//   port: 3306,
//   password: "iwc234cwi", //"admin@123",
//   ssl: { cert: fs.readFileSync("./iwc_testing_key.pem") },
//   database: "jaco_iv_db",
// });

// connection.connect((err) => {
//   if (err) {
//     console.log("error => ", err.name, err.message);
//     return;
//   }
//   console.log("Connected Successfully!", connection.threadId);
// });

// var connection = mysql.createConnection({
//   host: "iwc-testing-db.c6shtrginbef.us-east-1.rds.amazonaws.com",
//   port: "3306",
//   user: "mkjaco",
//   password: "iwc234cwi",
//   database: "jaco_iv_db",
// });

// connection.connect(function (err) {
//   if (!err) {
//     console.log("Database is connected ... ");
//   } else {
//     console.log("Error connecting database ... ", err);
//   }
// });

// conn
//   .on("ready", () => {
//     console.log("Client :: ready");
//     // conn.sftp((err, sftp) => {
//     //   if (err) throw err;
//     //   sftp.readdir("foo", (err, list) => {
//     //     if (err) throw err;
//     //     console.dir(list);
//     //     conn.end();
//     //   });
//     // });
//   })
//   .connect({
//     host: "54.87.53.190",
//     port: 22,
//     username: "mkjaco",
//     password: "[cZ8&*P{",
//     // privateKey: fs.readFileSync("./iwc_testing_key.pem"),
//   });

app.get("/", async (req, res) => {
  // Call S3 to get object information
  // const command = new GetObjectCommand(params);

  // try {
  //   // const response = await client.send(command);
  //   // // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
  //   // const str = await response.Body.transformToString();
  //   // console.log(str);
  //   const data = await client.listBuckets(params);
  //   console.log(data);
  // } catch (err) {
  //   console.error(err);
  // }

  s3.headObject(params, function (err, data) {
    if (err) {
      console.log("Error getting object information:", err);
    } else {
      console.log("Object information:", data);
      console.log("Content type:", data.ContentType);
      console.log("Content length:", data.ContentLength);
      console.log("Last modified:", data.LastModified);
      // You can access other properties of the object info as needed
    }
  });

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
