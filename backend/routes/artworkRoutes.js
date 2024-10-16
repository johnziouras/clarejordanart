const express = require("express");
const router = express.Router();
const {
  getArtwork,
  setArtwork,
  updateArtwork,
  deleteArtwork,
} = require("../controllers/artworkController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getArtwork).post(protect, setArtwork);
router.route("/:id").put(protect, updateArtwork).delete(protect, deleteArtwork);

module.exports = router;
