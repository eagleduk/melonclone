let player;
document.querySelectorAll("main li.song-item").forEach((element) => {
  element.addEventListener("click", (e) => {
    const { id } = element.dataset;
    const playerFrame = document.querySelector("#player");
    if (playerFrame.dataset.id === id) return;
    playerFrame.classList.add("show");
    playerFrame.classList.remove("hide");
    playerFrame.dataset.id = id;

    if (player) {
      player.stopVideo();
      player.destroy();
      player = null;
    }
    player = new YT.Player("yt-player", {
      height: "360",
      width: "500px",
      videoId: id,
      playerVars: {
        // controls: 0,
        rel: 0,
        fs: 0,
        modestbranding: 1,
      },
    });
  });
});

document.getElementById("player-close").addEventListener("click", (e) => {
  const playerFrame = document.querySelector("#player");
  playerFrame.classList.remove("show");
  playerFrame.dataset.id = Date.now();
  //   document.querySelector("#player").classList.add("hide");
  player.stopVideo();
  player.destroy();
  player = null;
  setTimeout(() => {
    document.querySelector("#player").classList.add("hide");
  }, 700);
});

//player.playVideo()
//player.pauseVideo()
//player.stopVideo()