const axios = require("axios");
const sharp = require("sharp");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET,
  },
});

const uploadFile = async (file) => {
  await uploadPrimaryImage(file);
  await uploadThumbnail(file);
  const thumbnailUrl = `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/thumbnails/${file.originalname}`;
  const url = `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/images/${file.originalname}`;
  const dimensions = await getDimensions(url);
  return {
    url,
    thumbnailUrl,
    dimensions,
  };
};

const uploadPrimaryImage = async (file) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `images/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    const response = await client.send(command);
  } catch (error) {
    throw new Error("Error uploading to S3:", error);
  }
};

const uploadThumbnail = async (file) => {
  const thumbnailParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `thumbnails/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const thumbnailCommand = new PutObjectCommand(thumbnailParams);
    const thumbnailResponse = await client.send(thumbnailCommand);
  } catch (error) {
    throw new Error("Error uploading to S3:", error);
  }
};

const getDimensions = async (url) => {
  const getResponse = await axios.get(url, {
    responseType: "arraybuffer",
  });
  const buffer = Buffer.from(getResponse.data);
  const metadata = await sharp(buffer).metadata();
  const dimensions = {
    width: metadata.width,
    height: metadata.height,
  };
  return dimensions;
};

module.exports = {
  uploadFile,
};
