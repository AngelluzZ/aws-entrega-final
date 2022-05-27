import S3 from '../node_modules/aws-sdk/clients/s3.js'
import fs from "fs";
//const S3 = require('aws-sdk/clients/s3');
import {} from 'dotenv/config'

//const bucketName = ;
const region = "us-east-1";
const accessKeyId = "ASIA567JEWZ72FLPFBVK";
const secretAccessKey = "CEWX4LjeyUsDh71Vnu9sI0v9r48O4wwe0mS7+K7j";
const sessionToken = "FwoGZXIvYXdzEOP//////////wEaDJW3ReP0YNbfZSisXSLOAYwepLICf/rnpoGGk2liIQ0YpLbzYEfllp/T4zEquwILHBd6fYtpGK5IiKChQVFbTrSsHxvhp/HObB9l8tn7HQdwUOpdF5VWNDEMjtkMUUweL1TwpODFlTbL9wNDpgeBtYAPEg4qIpob3a6C0abe2taqyWtCzCMyypuoh70shFmTLCoeNr0wC4RbkykNb/AZPo6SXGCykhTLXN97X8SrjfsD6i1jGzAEfU9FL5YLIj6oMNroi5QGZ0rpqQ1U+5h5aGvd90jgLXIU0Pvjhi9+KP++wpQGMi2erXDD3igLwzmMrpevuMuwdHXSfu//jG3vCC2iHab8wfzSi2BaHbIIeZPH+8w=";

const s3 = new S3 ({
    region,
    accessKeyId,
    secretAccessKey,
    sessionToken
})

// uploads a file to s3
export function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: "a16003152-files",
        Body: fileStream,
        Key: file.filename,
        ACL:'public-read'
    };

    return s3.upload(uploadParams).promise();
}
