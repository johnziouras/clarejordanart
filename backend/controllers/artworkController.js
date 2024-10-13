const asyncHandler = require("express-async-handler");

// @desc    Get all images
// @route   GET /api/images
// @access  Public
const getArtwork = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get artwork" });
});

// @desc    Set image
// @route   /api/images
// @access  Public
const setArtwork = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: "set artwork" });
});

// @desc    Update image
// @route   PUT /api/images/:id
// @access  Private
const updateArtwork = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update artwork ${req.params.id}` });
});

// @desc    Delete images
// @route   DELETE /api/images/:id
// @access  Private
const deleteArtwork = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete artwork ${req.params.id}` });
});

module.exports = {
  getArtwork,
  setArtwork,
  updateArtwork,
  deleteArtwork,
};
