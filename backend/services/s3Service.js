const fs = require("fs");
const path = require("path");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET,
  },
});

const uploadFile = async (file) => {
  // const filePath = file.path;
  // const fileContent = fs.readFileSync(file.path);
  // const fileName = path;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    // Key: fileName,
    // Body: fileContent,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    const response = await client.send(command);
    return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${file.originalname}`;
  } catch (error) {
    throw new Error("Error uploading to S3:", error);
  }
};

module.exports = {
  uploadFile,
};
