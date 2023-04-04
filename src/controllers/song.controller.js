import Song from "../models/song.model";
import { PullVideo } from "../api/youtube.api";

export const pull = async (req, res) => {
  if (req.query.key === process.env.PULLREQUESTKEY) {
    await Song.deleteMany({});
    const songs = await PullVideo();
    Song.insertMany(songs);
    return res.send("<h1> Pull </h1>");
  }
  return res.send("<h1> Hello </h1>");
};
