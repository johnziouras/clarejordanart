const asyncHandler = require("express-async-handler");
const { uploadFile } = require("../services/s3Service");
const Artwork = require("../models/artworkModel");
const crypto = require("crypto");

const getArtwork = asyncHandler(async (req, res) => {
  const { type } = req.query; // Extract type from query params

  try {
    const filter = type ? { type } : {};

    const artwork = await Artwork.find(filter);

    if (!artwork || artwork.length === 0) {
      return res.status(404).json({ message: "No artwork found" });
    }

    res.status(200).json(artwork);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve artwork" });
  }
});

const setArtwork = asyncHandler(async (req, res) => {
  if (!req.body || !req.files || !req.files.primaryFile) {
    res.status(400);
    throw new Error("Primary image is required");
  }

  try {
    const {
      title = "",
      altText = "",
      height = "",
      width = "",
      medium = "",
      year = "",
      description = "",
      displayOrder = 0,
      available = false,
      type = "",
    } = req.body;

    const hash = crypto
      .createHash("sha256")
      .update(req.files.primaryFile[0].buffer)
      .digest("hex");

    // Check if artwork with the same hash already exists
    const existingArtwork = await Artwork.findOne({ hash });
    if (existingArtwork) {
      return res
        .status(400)
        .json({ message: "Duplicate file upload detected" });
    }

    const response = await uploadFile(req.files.primaryFile[0]);
    console.log("RESPONSE", response);
    const primaryImageUrl = response.url;
    const primaryImageDimensions = response.dimensions;
    const primaryImageThumbnail = response.thumbnailUrl;

    let alternativeImageUrls = [];
    if (req.files.alternativeFiles) {
      alternativeImageUrls = await Promise.all(
        req.files.alternativeFiles.map((file) => uploadFile(file))
      );
    }

    const artwork = await Artwork.create({
      title,
      primaryImageUrl,
      primaryImageThumbnail,
      alternativeImageUrls,
      primaryImageDimensions,
      altText,
      height,
      width,
      medium,
      year,
      description,
      displayOrder,
      available,
      type,
      hash,
    });

    res.status(200).json(artwork);
  } catch (error) {
    res.status(500);
    console.log("Error:", error);
    throw new Error("Failed to upload artwork");
  }
});

const updateArtwork = asyncHandler(async (req, res) => {
  const artwork = await Artwork.findById(req.params.id);

  if (!artwork) {
    res.status(400);
    throw new Error("Artwork not found");
  }

  const updatedArtwork = await Artwork.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedArtwork);
});

const deleteArtwork = asyncHandler(async (req, res) => {
  const artwork = await Artwork.findById(req.params.id);

  if (!artwork) {
    res.status(400);
    throw new Error("Artwork not found");
  }

  await artwork.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getArtwork,
  setArtwork,
  updateArtwork,
  deleteArtwork,
};
