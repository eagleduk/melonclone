import Song from "../models/song.model";

export const home = async (req, res) => {
  const list = await Song.find().sort({ "statistics.viewCount": -1 });
  return res.render("home", {
    pageTitle: "Home",
    siteName: "Melong Music",
    list: list,
  });
};
