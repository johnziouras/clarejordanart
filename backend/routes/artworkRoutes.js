const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();

const {
  getArtwork,
  setArtwork,
  updateArtwork,
  deleteArtwork,
} = require("../controllers/artworkController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(getArtwork)
  .post(protect, upload.single("imageFile"), setArtwork);
router.route("/:id").put(protect, updateArtwork).delete(protect, deleteArtwork);

module.exports = router;
