const playerFrame = document.querySelector("#player");
const playerListElement = document.querySelector("#player-list");

globalThis.playLists = [];
globalThis.playIndex = -1;

function onStateChange(event) {
  if (event.data === 0) {
    if (globalThis.playIndex < globalThis.playLists.length - 1) {
      playerListElement.children[globalThis.playIndex].classList.remove(
        "song-highlight"
      );
      globalThis.playIndex += 1;
      playerListElement.children[globalThis.playIndex].classList.add(
        "song-highlight"
      );
      const id = globalThis.playLists[globalThis.playIndex];
      event.target.cueVideoById({
        videoId: id,
      });
      playerFrame.dataset.id = id;
    }
  } else if (event.data === 5) {
    event.target.playVideo();
  }
}

window.YT.ready(() => {
  const player = new YT.Player("yt-player", {
    width: "500px",
    playerVars: {
      rel: 0,
      fs: 0,
      modestbranding: 1,
      autoplay: 1,
    },
    events: {
      onStateChange,
    },
  });

  document
    .querySelectorAll("main li.song-item button.play-song")
    .forEach((element) => {
      element.addEventListener("click", (e) => {
        const { id, title } = e.target.dataset;

        if (playerFrame.dataset.id === id) return;
        playerFrame.classList.add("show");
        playerFrame.classList.remove("hide");
        playerFrame.dataset.id = id;
        playerListElement.children[globalThis.playIndex]?.classList.remove(
          "song-highlight"
        );
        player.cueVideoById({
          videoId: id,
        });
        globalThis.playIndex = 0;
        globalThis.playLists.unshift(id);

        const li = document.createElement("li");
        li.className = "song-highlight";
        li.dataset.id = id;
        li.textContent = title;
        playerListElement.prepend(li);
      });
    });

  document
    .querySelectorAll("main li.song-item button.add-song")
    .forEach((element) => {
      element.addEventListener("click", (e) => {
        const { id, title } = e.target.dataset;
        if (globalThis.playLists.indexOf(id) > -1) return;
        globalThis.playIndex = 0;
        globalThis.playLists.push(id);
        if (globalThis.playLists.length === 1 && false) {
          playerFrame.classList.add("show");
          playerFrame.classList.remove("hide");
          playerFrame.dataset.id = id;
          player.cueVideoById({
            videoId: id,
          });
        }
        const li = document.createElement("li");
        li.dataset.id = id;
        li.textContent = title;
        playerListElement.append(li);
      });
    });

  document.getElementById("player-slider").addEventListener("click", (e) => {
    if (playerFrame.classList.length === 0) {
      playerFrame.classList.add("show");
    } else {
      playerFrame.classList.toggle("hide");
      playerFrame.classList.toggle("show");
      playerFrame.dataset.id = Date.now();
    }
  });

  document.querySelector("button#prev-song").addEventListener("click", (e) => {
    if (
      (globalThis.playIndex === -1 && globalThis.playLists.length === 0) ||
      globalThis.playLists.length === 1
    )
      return;

    playerListElement.children[globalThis.playIndex].classList.remove(
      "song-highlight"
    );

    globalThis.playIndex =
      globalThis.playIndex === 0
        ? globalThis.playLists.length - 1
        : globalThis.playIndex - 1;
    playerListElement.children[globalThis.playIndex].classList.add(
      "song-highlight"
    );

    const id = globalThis.playLists[globalThis.playIndex];
    playerFrame.dataset.id = id;

    player.cueVideoById({
      videoId: id,
    });
  });

  document.querySelector("button#pause-song").addEventListener("click", (e) => {
    player.pauseVideo();
  });

  document.querySelector("button#play-song").addEventListener("click", (e) => {
    if (globalThis.playIndex === -1 && globalThis.playLists.length === 0)
      return;
    player.playVideo();
  });

  document.querySelector("button#next-song").addEventListener("click", (e) => {
    if (
      (globalThis.playIndex === -1 && globalThis.playLists.length === 0) ||
      globalThis.playLists.length === 1
    )
      return;
    playerListElement.children[globalThis.playIndex].classList.remove(
      "song-highlight"
    );
    globalThis.playIndex =
      globalThis.playIndex === globalThis.playLists.length - 1
        ? 0
        : globalThis.playIndex + 1;
    playerListElement.children[globalThis.playIndex].classList.add(
      "song-highlight"
    );
    const id = globalThis.playLists[globalThis.playIndex];
    playerFrame.dataset.id = id;

    player.cueVideoById({
      videoId: id,
    });
  });
});
