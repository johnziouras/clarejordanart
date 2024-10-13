const asyncHandler = require("express-async-handler");

const Artwork = require("../models/artworkModel");

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
  if (!req.body) {
    res.status(400);
    throw new Error();
  }

  const { title, imageURL, altText, height, width, medium, year, description } =
    req.body;

  const artwork = await Artwork.create({
    title,
    imageURL,
    altText,
    height,
    width,
    medium,
    year,
    description,
  });

  res.status(200).json(artwork);
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
