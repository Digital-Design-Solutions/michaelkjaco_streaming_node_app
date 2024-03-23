import boto3

def lambda_handler(event, context):
    # Get the bucket name and file key from the event
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    file_key = event['Records'][0]['s3']['object']['key']
    
    # Perform any actions you want with the uploaded file
    print(f"File '{file_key}' uploaded to bucket '{bucket_name}'")

    # Example action: Get the content of the uploaded file
    s3 = boto3.client('s3')
    response = s3.get_object(Bucket=bucket_name, Key=file_key)
    content = response['Body'].read().decode('utf-8')
    print("Content of the file:")
    print(content)

    # You can add any other processing logic or integrations here

    # Return a response if needed
    return {
        'statusCode': 200,
        'body': 'File upload triggered successfully'
    }
