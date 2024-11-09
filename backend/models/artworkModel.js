const mongoose = require("mongoose");

const artworkSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    imageURL: {
      type: String,
      required: true,
      trim: true,
    },
    altText: {
      type: String,
      trim: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    medium: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      enum: ["painting", "watercolor", "photograph"],
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
