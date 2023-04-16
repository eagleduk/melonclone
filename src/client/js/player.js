globalThis.playLists = [];
globalThis.playIndex = -1;

function onStateChange(event) {
  if (event.data === 0) {
    if (globalThis.playIndex < globalThis.playLists.length - 1) {
      globalThis.playIndex += 1;
      const id = globalThis.playLists[globalThis.playIndex];
      event.target.cueVideoById({
        videoId: id,
      });
      const playerFrame = document.querySelector("#player");
      playerFrame.dataset.id = id;
    }
  } else if (event.data === 5) {
    event.target.playVideo();
  }
}

window.YT.ready(() => {
  const playerFrame = document.querySelector("#player");

  const player = new YT.Player("yt-player", {
    // height: "360",
    width: "500px",
    //videoId: id,
    playerVars: {
      // controls: 0,
      rel: 0,
      fs: 0,
      modestbranding: 1,
      autoplay: 1,
    },
    events: {
      onStateChange,
    },
  });

  globalThis.player = player;

  document
    .querySelectorAll("main li.song-item button.play-song")
    .forEach((element) => {
      element.addEventListener("click", (e) => {
        const { id } = e.target.dataset;

        if (playerFrame.dataset.id === id) return;
        playerFrame.classList.add("show");
        playerFrame.classList.remove("hide");
        playerFrame.dataset.id = id;

        player.cueVideoById({
          videoId: id,
        });
        globalThis.playIndex = 0;
        globalThis.playLists.unshift(id);
      });
    });

  document
    .querySelectorAll("main li.song-item button.add-song")
    .forEach((element) => {
      element.addEventListener("click", (e) => {
        const { id } = e.target.dataset;
        // player.cueVideoById({
        //   index: 0,
        //   list: id,
        // })
        if (globalThis.playLists.indexOf(id) < 0) globalThis.playLists.push(id);
        if (globalThis.playLists.length === 1) {
          playerFrame.classList.add("show");
          playerFrame.classList.remove("hide");
          playerFrame.dataset.id = id;
          player.cueVideoById({
            videoId: id,
          });
        }
      });
    });

  // document.querySelectorAll("main li.song-item").forEach((element) => {
  //   element.addEventListener("click", (e) => {
  //     const { id } = element.dataset;
  //     const playerFrame = document.querySelector("#player");
  //     if (playerFrame.dataset.id === id) return;
  //     playerFrame.classList.add("show");
  //     playerFrame.classList.remove("hide");
  //     playerFrame.dataset.id = id;

  //     if (player) {
  //       player.loadVideoById(id);
  //     }
  //   });
  // });

  document.getElementById("player-slider").addEventListener("click", (e) => {
    if (playerFrame.classList.length === 0) {
      playerFrame.classList.add("show");
    } else {
      playerFrame.classList.toggle("hide");
      playerFrame.classList.toggle("show");
      playerFrame.dataset.id = Date.now();
      //   document.querySelector("#player").classList.add("hide");
      if (player) {
        // player.stopVideo();
        // player.destroy();
      }
    }
  });

  // TODO: 플레이어 버튼 컨트롤
});

// let player;
// document.querySelectorAll("main li.song-item").forEach((element) => {
//   element.addEventListener("click", (e) => {
//     const { id } = element.dataset;
//     const playerFrame = document.querySelector("#player");
//     if (playerFrame.dataset.id === id) return;
//     playerFrame.classList.add("show");
//     playerFrame.classList.remove("hide");
//     playerFrame.dataset.id = id;

//     if (player) {
//       player.stopVideo();
//       player.destroy();
//       player = null;
//     }
//     player = new YT.Player("yt-player", {
//       // height: "360",
//       width: "500px",
//       //videoId: id,
//       playerVars: {
//         // controls: 0,
//         rel: 0,
//         fs: 0,
//         modestbranding: 1,
//       },
//     });
//   });
// });

// document.getElementById("player-close").addEventListener("click", (e) => {
//   const playerFrame = document.querySelector("#player");
//   playerFrame.classList.remove("show");
//   playerFrame.dataset.id = Date.now();
//   document.querySelector("#player").classList.add("hide");
//   player.stopVideo();
//   player.destroy();
//   player = null;
//   setTimeout(() => {
//     document.querySelector("#player").classList.add("hide");
//   }, 700);
// });

// document.getElementById("player-slider").addEventListener("click", (e) => {
//   const playerFrame = document.querySelector("#player");

//   if (playerFrame.classList.length === 0) {
//     playerFrame.classList.add("show");
//   } else {
//     playerFrame.classList.toggle("hide");
//     playerFrame.classList.toggle("show");
//     playerFrame.dataset.id = Date.now();
//     //   document.querySelector("#player").classList.add("hide");
//     if (player) {
//       player.stopVideo();
//       player.destroy();
//       player = null;
//     }
//   }
// });

//player.playVideo()
//player.pauseVideo()
//player.stopVideo()
