const expressAsyncHandler = require("express-async-handler");
const asyncHandler = require("express-async-handler");
// @desc    Get all images
// @route   GET /images
// @access  Public
const getImages = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: "get images" });
});

module.exports = {
  getImages,
};
