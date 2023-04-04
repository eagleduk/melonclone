import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  id: String,
  snippet: {
    title: String,
    description: String,
    thumbnails: {
      default: {
        url: String,
        width: Number,
        height: Number,
      },
      medium: {
        url: String,
        width: Number,
        height: Number,
      },
      high: {
        url: String,
        width: Number,
        height: Number,
      },
      standard: {
        url: String,
        width: Number,
        height: Number,
      },
    },
  },
  statistics: {
    viewCount: Number,
  },
  player: {
    embedHtml: String,
  },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
