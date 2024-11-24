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
    const url = `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${file.originalname}`;
    const getResponse = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(getResponse.data);
    const metadata = await sharp(buffer).metadata();
    dimensions = {
      width: metadata.width,
      height: metadata.height,
    };
    return {
      url,
      dimensions,
    };
  } catch (error) {
    throw new Error("Error uploading to S3:", error);
  }
};

module.exports = {
  uploadFile,
};
