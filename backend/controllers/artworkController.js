const asyncHandler = require("express-async-handler");
const { uploadFile } = require("../services/s3Service");
const Artwork = require("../models/artworkModel");
const crypto = require("crypto");

// @desc    Get all images
// @route   GET /api/images
// @access  Public
const getArtwork = asyncHandler(async (req, res) => {
  const artwork = await Artwork.find();

  res.status(200).json(artwork);
});

// @desc    Set image
// @route   /api/images
// @access  Public
const setArtwork = asyncHandler(async (req, res) => {
  if (!req.body || !req.file) {
    res.status(400);
    throw new Error();
  }

  try {
    const {
      title = "",
      altText = "",
      height,
      width,
      medium,
      year,
      description = "",
      available = false,
    } = req.body;

    const hash = crypto
      .createHash("sha256")
      .update(req.file.buffer)
      .digest("hex");

    console.log("hash:", hash);

    // Check if artwork with the same hash already exists
    const existingArtwork = await Artwork.findOne({ hash });
    if (existingArtwork) {
      return res
        .status(400)
        .json({ message: "Duplicate file upload detected" });
    }

    const imageURL = await uploadFile(req.file);

    const artwork = await Artwork.create({
      title,
      imageURL,
      altText,
      height,
      width,
      medium,
      year,
      description,
      available,
      hash,
    });

    res.status(200).json(artwork);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to upload artwork");
  }
});

// @desc    Update image
// @route   PUT /api/images/:id
// @access  Private
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

// @desc    Delete images
// @route   DELETE /api/images/:id
// @access  Private
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
