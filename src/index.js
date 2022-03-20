let isMobile = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk/i.test(navigator.userAgent);
let tileSize = isMobile ? 20 : 30;
let darkMode = false;

let palets = {
  dark: {
    background: "2F3145",
    hex: "#1E202C",
    cell: [
          //dead
          "rgb(0,0,0,0)"
          ,
          //after dead
          "#9FA7FF4F",
          //on born
          "#4A59FF",
          //life
          "#0015FF"
          ]
  },
  light: {
    background: "white",
    hex: "#EBEBEB",
    cell: [
      //dead
      "rgb(0,0,0,0)",
      //after dead
      "#D4D8FF6B",
      //on born
      "#B1B8FF",
      //life
      "#949DFF"
      ]
  }
}

function darkModeCss() {
  let iconColor = darkMode ? "dark" : "white",
    fontColor = darkMode ? "white" : "dark",
    backgroundColor = darkMode ? "#3B3E65" : "white",
    linkColor = darkMode ? "yellow" : "blue";

  document.documentElement.style.setProperty('--iconColor', iconColor);
  document.documentElement.style.setProperty('--fontColor', fontColor);
  document.documentElement.style.setProperty('--backgroundColor', backgroundColor);
  document.documentElement.style.setProperty('--linkColor', linkColor);
}

function darkModeStyle(){
  darkModeCss();
  functionsUi.switchMode(true);
}

function turnDarkMode(bool){
  darkMode = bool;
  darkModeStyle()
}
function getPalet() {
  return darkMode ? palets.dark : palets.light;
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  return { x, y };
};

let game = new Game("canvas");

window.onload = () => {
  game.on();
}

window.window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  turnDarkMode(e.matches ? true : false);
});



game.getCanvas().addEventListener("click", (ev) => {
  let { x, y } = getCursorPosition(game.getCanvas(), ev);

  let tileX = Math.floor(game.worldTile(x)),
    tileY = Math.floor(game.worldTile(y));

  let cell = game.getCell(tileX, tileY);
  if (cell != null) {
    cell.setStrictState(!cell.state);
  }
});

(function() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    turnDarkMode(true);
  }
  darkModeStyle();
  functionsUi.display();
})();
