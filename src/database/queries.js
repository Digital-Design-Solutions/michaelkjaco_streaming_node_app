const { DB_NAME } = require("../utils/secrets");

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

//  Speakers

const createTableSpeakers = `CREATE TABLE speakers (speaker_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
speaker_name VARCHAR(255) NOT NULL,
is_active BOOLEAN NOT NULL DEFAULT TRUE, 
is_deleted BOOLEAN NOT NULL DEFAULT FALSE, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

//  Video Speaker mapping

const createTableVideoSpeakerMapping = `CREATE TABLE video_speaker_mapping (video_speaker_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
video_id VARCHAR(50),
speaker_id INT,
is_active BOOLEAN NOT NULL DEFAULT TRUE, 
is_deleted BOOLEAN NOT NULL DEFAULT FALSE, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (speaker_id) REFERENCES speakers(speaker_id),
FOREIGN KEY (video_id) REFERENCES videos(video_id)
)`;

//  Category

const createTableCategories = `CREATE TABLE categories (category_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
category_name VARCHAR(255) NOT NULL,
is_active BOOLEAN NOT NULL DEFAULT TRUE, 
is_deleted BOOLEAN NOT NULL DEFAULT FALSE, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

// Collections

const createTableCollections = `CREATE TABLE collections (collection_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
collection_name VARCHAR(255) NOT NULL,
is_active BOOLEAN NOT NULL DEFAULT TRUE, 
is_deleted BOOLEAN NOT NULL DEFAULT FALSE, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

//  Video

const createTableVideo = `CREATE TABLE videos (
video_id VARCHAR(50) NOT NULL PRIMARY KEY,
new_title VARCHAR(1000) NOT NULL,
synopsis VARCHAR(5000)  NULL,
tags VARCHAR(1000)  NULL,
release_date VARCHAR(75)  NULL,
s3_video_id VARCHAR(75)  NULL,
views INT  NULL,
cover_image VARCHAR(1000)  NULL,
duration VARCHAR(100)  NULL,
category_id INT  NULL,
collection_id INT  NULL,
availability enum('0','1','2')  NULL,
object_url VARCHAR (1000)  NULL,
entity_tags VARCHAR(500)  NULL,
is_active BOOLEAN NOT NULL DEFAULT TRUE, 
is_deleted BOOLEAN NOT NULL DEFAULT FALSE, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (category_id) REFERENCES categories(category_id),
FOREIGN KEY (collection_id) REFERENCES collections(collection_id)
)`;

const addSpeaker = `INSERT INTO speakers VALUES(null, ?, TRUE, FALSE, NOW(), NOW())`;
const addCategory = `INSERT INTO categories VALUES(null, ?, TRUE, FALSE, NOW(), NOW())`;
const addCollection = `INSERT INTO collections VALUES(null, ?, TRUE, FALSE, NOW(), NOW())`;

const addNewVideo = `
INSERT INTO videos VALUES(
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    TRUE,
    FALSE,
    NOW(),
    NOW()
    );
`;

const createNewVideoSpeakerMapping = `
null,
?,
?,
TRUE,
FALSE,
NOW(),
NOW()
`;

const getAllVideos = `
SELECT 
    v.video_id,
    v.new_title,
    v.synopsis,
    v.tags,
    v.release_date,
	v.s3_video_id,
    v.views,
    v.cover_image,
    v.duration,
    v.availability,
    v.object_url,
    v.entity_tags,
    v.is_active,
    v.is_deleted,
    v.created_at,
    v.updated_at,
    c.collection_name,
    v.category_id,
    cat.category_name,
    s.speaker_id,
    s.speaker_name
FROM 
    videos v
JOIN 
    collections c ON v.collection_id = c.collection_id
JOIN 
    categories cat ON v.category_id = cat.category_id
JOIN
    video_speaker_mapping vsm ON v.video_id = vsm.video_id
JOIN
    speakers s ON vsm.speaker_id = s.speaker_id;
`;

const getAllCategories = `SELECT * FROM categories`;
const getAllSpeakers = `SELECT * FROM speakers`;

module.exports = {
  createDB,
  dropDB,
  createTableSpeakers,
  createTableVideoSpeakerMapping,
  createTableCategories,
  createTableCollections,
  createTableVideo,
  addNewVideo,
  addSpeaker,
  addCategory,
  addCollection,
  getAllVideos,
  createNewVideoSpeakerMapping,
  getAllCategories,
  getAllSpeakers,
};
