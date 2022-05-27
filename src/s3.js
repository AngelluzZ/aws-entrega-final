import S3 from '../node_modules/aws-sdk/clients/s3.js'
import fs from "fs";
//const S3 = require('aws-sdk/clients/s3');
import {} from 'dotenv/config'

//const bucketName = ;
const region = "us-east-1";
const accessKeyId = "ASIA567JEWZ7SQ54WE7L";
const secretAccessKey = "DSKD4pe1EB2Dw37BpN8mRwqV/dITevsL7EaFGBqd";
const sessionToken = "FwoGZXIvYXdzEOr//////////wEaDE3MXNUJhssLYRvF6iLOAXWE/etrGwL1IKJf2jGf+auowECXl2kTIzHDZ0s+FmFrxwlQoiZbazDrYOj2LHN2AHMiAYy9yOlRCZ7ZWBnDHP+cwkloXPe4WegcR0wVRcAcTc2n8nZnch0BfmpJvOipUugakUva2NCKBNCk6zReE9OHHG8RJP9YMqjNAfeLZ/Dos4P2sTW3eeMis98vXwsPcg9vRLx0miemcsZYOIqH5uUGCyES3KFRGC0wgb4vPbG6aW4W/vi3HnXuz8OX98P/fvMI5z3szc8ZOhUzBQsqKM/3w5QGMi1G81hQsCI824ovRBrwq+nY8U3edm6MhXAx67DTeE6AP3D7u0kZ1pBEOwAuqcg=";

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
