import { google } from "googleapis";

globalThis.youtube =
  globalThis.youtube ||
  google.youtube({
    version: "v3",
    auth: process.env.API_KEY,
  });

async function PullVideo() {
  const response = await globalThis.youtube.videos.list({
    part: "id,snippet,player,statistics",
    chart: "mostPopular",
    videoCategoryId: "10",
    regionCode: "KR",
    maxResults: 100,
  });

  if (response.statusText === "OK") {
    /**
     * kind,
     * etag,
     * id
     * snippet { publishedAt, channelId, title, description,
     *           thumbnails { default, medium, high, standard },
     *           channelTitle, categoryId, liveBroadcastContent,
     *           localized { title, description }
     *           defaultAudioLanguage },
     * player { embedHtml }
     *
     */
    return response.data.items;
  }

  return [];
}

export { PullVideo };
