const mongoose = require("mongoose");

const artworkSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    primaryImageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    alternativeImageUrls: [
      {
        type: String,
        trim: true,
      },
    ],
    altText: {
      type: String,
      trim: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    medium: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
    },
    description: {
      type: String,
    },
    available: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      enum: ["artwork", "photograph"],
      required: true,
    },
    hash: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Artwork", artworkSchema);
