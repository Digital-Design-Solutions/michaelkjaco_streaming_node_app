import sys
import logging
import pymysql
import json
import os
import boto3
from botocore.exceptions import ClientError
from datetime import datetime

def get_secret():

    secret_name = "rds!instance-a123bc12d-ef34-5g6h-ij7k-lm8n901o23pq"
    region_name = "us-west-2"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        raise e

    # secret = get_secret_value_response['SecretString']

# rds settings
# secret = json.loads(secret)
db_username = os.environ['DB_USER_NAME']
# secret.get('username')
db_password = os.environ['DB_PASSWORD']
# secret.get('password')
rds_proxyhost = os.environ['RDS_PROXY_HOST']
db_name = os.environ['DATABASE_NAME']
# secret.get('dbname')

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# create the database connection outside of the handler to allow connections to be
# re-used by subsequent function invocations.
try:
        conn = pymysql.connect(host=rds_proxyhost, user=db_username, passwd=db_password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit(1)

logger.info("SUCCESS: Connection to RDS for MySQL instance succeeded")

def lambda_handler(event, context):
    """
    This function creates a new RDS database table and writes records to it
    """
    message = event['Records'][0]['body']
    data = message
    # json.loads(message)
    # speaker_name = data['speaker_name']
    is_active = True
    is_deleted = False
    created_at = datetime.now()
    updated_at = datetime.now()
    
    # check if given collection name exits in collection table if not add and retrieve the collection_id
    category_name = data['category_name'] if data['category_name'] is not None else ""
    collection_insert_query = f("INSERT INTO collections (collection_name) SELECT %s WHERE NOT EXISTS (SELECT 1 FROM collections WHERE collection_name = %s)")
    with conn.cursor() as cur:
        cur.execute
        
    item_count = 0
    video_id = data['video_id']
    new_title = data['new_title']
    synopsis = data['synopsis'] if data['synopsis'] is not None else ""
    tags = data['tags'] if data['tags'] is not None else ""
    release_date = data['release_date'] if data['release_date'] is not None else ""
    s3_video_id = data['s3_video_id'] if data['s3_video_id'] is not None else ""
    views = data['views'] if data['views'] is not None else ""
    cover_image = data['cover_image'] if data['cover_image'] is not None else ""
    duration = data['duration'] if data['duration'] is not None else ""
    category_id = data['category_id'] if data['category_id'] is not None else ""
    collection_id = data['collection_id'] if data['collection_id'] is not None else ""
    availability = 0 if data['availability'] == 'Public' else (1 if data['availability'] == 'Members Only' else 2)
    object_url = data['object_url'] if data['object_url'] is not None else ""
    entity_tags = data['entity_tags'] if data['entity_tags'] is not None else ""
    
    # speaker_insert_string = f"INSERT INTO speakers (speaker_name, is_active, is_deleted, created_at, updated_at) values(%s, %s, %s, %s, %s )"
    video_insert_string = f"INSERT INTO videos (video_id, new_title, synopsis, tags, release_date, s3_video_id, views, cover_image, duration, category_id, collection_id, availability, object_url, entity_tags, is_active, is_deleted, created_at, updated_at) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s )"

    
        cur.execute(video_insert_string, (video_id, new_title, synopsis, tags, release_date, s3_video_id, views, cover_image, duration, category_id, collection_id, availability, object_url, entity_tags,  is_active, is_deleted, created_at, updated_at))
        conn.commit()
        cur.execute("select * from videos where video_id = %s"%(video_id))
        logger.info("The following items have been added to the database:")
        for row in cur:
            item_count += 1
            logger.info(row)
    conn.commit()

    return "Added %d items to RDS for MySQL table" %(item_count)
    