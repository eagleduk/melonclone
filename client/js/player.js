"use strict";

var playerFrame = document.querySelector("#player");
var playerListElement = document.querySelector("#player-list");
globalThis.playLists = [];
globalThis.playIndex = -1;

function onStateChange(event) {
  if (event.data === 0) {
    if (globalThis.playIndex < globalThis.playLists.length - 1) {
      playerListElement.children[globalThis.playIndex].classList.remove("song-highlight");
      globalThis.playIndex += 1;
      playerListElement.children[globalThis.playIndex].classList.add("song-highlight");
      var id = globalThis.playLists[globalThis.playIndex];
      event.target.cueVideoById({
        videoId: id
      });
      playerFrame.dataset.id = id;
    }
  } else if (event.data === 5) {
    event.target.playVideo();
  }
}

window.YT.ready(function () {
  var player = new YT.Player("yt-player", {
    width: "500px",
    playerVars: {
      rel: 0,
      fs: 0,
      modestbranding: 1,
      autoplay: 1
    },
    events: {
      onStateChange: onStateChange
    }
  });

  function songClickHandler(event) {
    var _playerListElement$ch;

    var id = event.target.dataset.id;
    (_playerListElement$ch = playerListElement.children[globalThis.playIndex]) === null || _playerListElement$ch === void 0 ? void 0 : _playerListElement$ch.classList.remove("song-highlight");
    globalThis.playIndex = globalThis.playLists.indexOf(id);
    player.cueVideoById({
      videoId: id
    });
    playerListElement.children[globalThis.playIndex].classList.add("song-highlight");
  }

  document.querySelectorAll("main li.song-item button.play-song").forEach(function (element) {
    element.addEventListener("click", function (e) {
      var _playerListElement$ch2;

      var _element$dataset = element.dataset,
          id = _element$dataset.id,
          title = _element$dataset.title;
      if (playerFrame.dataset.id === id) return;
      playerFrame.classList.add("show");
      playerFrame.classList.remove("hide");
      playerFrame.dataset.id = id;
      (_playerListElement$ch2 = playerListElement.children[globalThis.playIndex]) === null || _playerListElement$ch2 === void 0 ? void 0 : _playerListElement$ch2.classList.remove("song-highlight");
      player.cueVideoById({
        videoId: id
      });
      globalThis.playIndex = 0;
      globalThis.playLists.unshift(id);
      var li = document.createElement("li");
      li.className = "song-highlight";
      li.dataset.id = id;
      li.textContent = title;
      li.title = title;
      li.addEventListener("click", songClickHandler);
      playerListElement.prepend(li);
    });
  });
  document.querySelectorAll("main li.song-item button.add-song").forEach(function (element) {
    element.addEventListener("click", function (e) {
      var _element$dataset2 = element.dataset,
          id = _element$dataset2.id,
          title = _element$dataset2.title;
      if (globalThis.playLists.indexOf(id) > -1) return;
      globalThis.playIndex = 0;
      globalThis.playLists.push(id);

      if (globalThis.playLists.length === 1 && false) {
        playerFrame.classList.add("show");
        playerFrame.classList.remove("hide");
        playerFrame.dataset.id = id;
        player.cueVideoById({
          videoId: id
        });
      }

      var li = document.createElement("li");
      li.dataset.id = id;
      li.textContent = title;
      li.title = title;
      li.addEventListener("click", songClickHandler);
      playerListElement.append(li);
    });
  });
  document.getElementById("player-slider").addEventListener("click", function (e) {
    if (playerFrame.classList.length === 0) {
      playerFrame.classList.add("show");
    } else {
      playerFrame.classList.toggle("hide");
      playerFrame.classList.toggle("show");
      playerFrame.dataset.id = Date.now();
    }
  });
  document.querySelector("button#prev-song").addEventListener("click", function (e) {
    if (globalThis.playIndex === -1 && globalThis.playLists.length === 0 || globalThis.playLists.length === 1) return;
    playerListElement.children[globalThis.playIndex].classList.remove("song-highlight");
    globalThis.playIndex = globalThis.playIndex === 0 ? globalThis.playLists.length - 1 : globalThis.playIndex - 1;
    playerListElement.children[globalThis.playIndex].classList.add("song-highlight");
    var id = globalThis.playLists[globalThis.playIndex];
    playerFrame.dataset.id = id;
    player.cueVideoById({
      videoId: id
    });
  });
  document.querySelector("button#pause-song").addEventListener("click", function (e) {
    player.pauseVideo();
  });
  document.querySelector("button#play-song").addEventListener("click", function (e) {
    if (globalThis.playIndex === -1 && globalThis.playLists.length === 0) return;
    var status = player.getPlayerState();
    playerListElement.children[globalThis.playIndex].classList.add("song-highlight");

    if (status === 5) {
      var ii = globalThis.playLists[0];
      player.loadVideoById(ii);
    } else {
      player.playVideo();
    }
  });
  document.querySelector("button#next-song").addEventListener("click", function (e) {
    if (globalThis.playIndex === -1 && globalThis.playLists.length === 0 || globalThis.playLists.length === 1) return;
    playerListElement.children[globalThis.playIndex].classList.remove("song-highlight");
    globalThis.playIndex = globalThis.playIndex === globalThis.playLists.length - 1 ? 0 : globalThis.playIndex + 1;
    playerListElement.children[globalThis.playIndex].classList.add("song-highlight");
    var id = globalThis.playLists[globalThis.playIndex];
    playerFrame.dataset.id = id;
    player.cueVideoById({
      videoId: id
    });
  });
});