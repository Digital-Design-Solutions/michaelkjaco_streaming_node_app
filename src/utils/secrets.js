require("dotenv/config");

const { logger } = require("./logger");

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_INSTANCE,
  JWT_SECRET_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  BUCKET_NAME,
  BUCKET_KEY,
  AWS_REGION,
} = process.env;

const requiredCredentials = [
  "DB_HOST",
  "DB_USER",
  "DB_PASS",
  "DB_NAME",
  "JWT_SECRET_KEY",
];

for (const credential of requiredCredentials) {
  if (process.env[credential] === undefined) {
    logger.error(`Missing required crendential: ${credential}`);
    process.exit(1);
  }
}

module.exports = {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_INSTANCE,
  JWT_SECRET_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  BUCKET_NAME,
  BUCKET_KEY,
  AWS_REGION,
};
