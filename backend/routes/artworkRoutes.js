const express = require("express");
const {
  getArtwork,
  setArtwork,
  updateArtwork,
  deleteArtwork,
} = require("../controllers/artworkController");
const router = express.Router();

router.route("/").get(getArtwork).post(setArtwork);
router.route("/:id").put(updateArtwork).delete(deleteArtwork);

module.exports = router;
