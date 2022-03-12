import Game from "/src/class/Game.js";

let isMobile = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk/i.test(navigator.userAgent);

let tileSize = isMobile ? 20 : 30;

let darkMode = false;

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  darkMode = true;
}

window.vars = {
  tileSize: tileSize,
  updateTime: 10,
  darkMode: darkMode
}

window.game = new Game("canvas");

window.onload = () => {
  window.game.on();
}

window.window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  window.vars.darkMode = e.matches ? true : false;
});
