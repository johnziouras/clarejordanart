const mongoose = require("mongoose");

const artworkSchema = mongoose.Schema(
  {
    displayOrder: {
      type: Number,
      default: null,
    },
    title: {
      type: String,
      trim: true,
    },
    primaryImageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    primaryImageDimensions: {
      width: Number,
      height: Number,
    },
    alternativeImageUrls: [
      {
        url: {
          type: String,
          trim: true,
        },
        dimensions: {
          width: Number,
          height: Number,
        },
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
      enum: ["artwork", "photograph", "album"],
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
