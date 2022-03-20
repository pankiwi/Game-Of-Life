"use strict";

const DialogSettings = new CustomDialog();



let functionsUi = {
  hidden: () => {
    const settings = document.getElementById("setting");
    if (settings.classList.contains("showSettings")) {
      settings.classList.remove("showSettings");
      for (let btn of settings.getElementsByTagName("button")) {
        btn.classList.remove("showBtn");
      }
    }
  },
  display: () => {
    const settings = document.getElementById("setting");
    if (!settings.classList.contains("showSettings")) {
      settings.classList.add("showSettings");
      for (let btn of settings.getElementsByTagName("button")) {
        btn.classList.add("showBtn");
      }
    }
  },
  generationCells: () => {
    if (game == null) return;
    game.map.forEach((cell) => {
      cell.setState(Math.random() < 0.5);
    })
  },
  switchUpdate: (style) => {
    if (game == null) return;
    if (!style) game.turnCanUpdate();

    const btn = document.getElementById("btn-3");
    let span = btn.firstElementChild;
    if (game.canUpdate) {
      if (btn.classList.contains("off")) btn.classList.remove("off");
      if (span.classList.contains("fa-hourglass-empty")) span.classList.remove("fa-hourglass-empty");

      btn.classList.add("on");
      span.classList.add("fa-hourglass");
    } else {
      if (btn.classList.contains("on")) btn.classList.remove("on");
      if (span.classList.contains("fa-hourglass")) span.classList.remove("fa-hourglass");

      btn.classList.add("off");
      span.classList.add("fa-hourglass-empty");
    }
  },
  clearMap: () => {
    if (game == null) return;
    game.map.forEach((cell) => {
      cell.setStrictState(false);
    })
  },
  setTimeUpdate: () => {
    if (game == null) return;
    let time = game.updateTime;
    DialogSettings.prompt('Set update time', game.updateTime)
      .then((res) => {
        let num = parseFloat(res.prompt.replace(/[^0-9.+-]/g, ''));

        game.updateTime = isNaN(num) ? time : num;

      })
      .catch((err) => {
        DialogSettings.alert("something is wrong " + err);
      });
  },
  switchMode: (style) => {
    if (style) {
      let btn = document.getElementById("btn-6");
      let span = btn.firstElementChild;

      if (darkMode) {
        if (btn.classList.contains("dark")) btn.classList.remove("dark");
        if (span.classList.contains("fa-moon")) span.classList.remove("fa-moon");

        btn.classList.add("light");
        span.classList.add("fa-sun");
      } else {
        if (btn.classList.contains("dark")) btn.classList.remove("dark");
        if (span.classList.contains("fa-moon")) span.classList.remove("fa-moon");

        btn.classList.add("light");
        span.classList.add("fa-sun");

        if (btn.classList.contains("light")) btn.classList.remove("light");
        if (span.classList.contains("fa-sun")) span.classList.remove("fa-sun");

        btn.classList.add("dark");
        span.classList.add("fa-moon");
      }
    } else {
      turnDarkMode(!darkMode);
    }
  },
  github: () => {
    DialogSettings.window("Github",
      `
    <p>Hi, im pankiwi creater this page 
    </br> its my  
    <a href="https://github.com/pankiwi" style="text-decoration: none" class="link">
        <span class="fa-brands fa-github-alt" style="font-size:20px"></span> 
    github
    </a>
    </p>
    <p>this is 
    <a href="https://github.com/pankiwi/Game-Of-Life" style="text-decoration: none" class="link">
      <span class="fa-solid fa-code" ></span> 
        source code
    </a> and add star this proyect</p>
    `);
  },
  informationControls: () => {
    DialogSettings.window("Information Controls", `
        <p>Click screen for set cell <span class="fa-solid fa-square" style="color: ${getPalet().cell[3]}"></span></p>
        <p>Close settings click on  <span class="fa fa-xmark"></span></p>
        <p><span class="fa-solid fa-shuffle"></span> generate random cells</p>
        <p><span class="fa fa-hourglass"></span>|<span class="fa fa-hourglass-empty"></span> stop and continue simulation</p>
        <p><span class="fa fa-arrows-rotate"></span> clear cells</p>
        <p><span class="fa fa-clock"></span> change speed simulation</p>
        <p><span class="fa-solid fa-moon"></span>|<span class="fa-solid fa-sun"></span> display and hidden dark mode</p>
        <p><span class="fa-brands fa-github-alt"></span> go watch my github </p>
        `);
  },
  informationGame: () => {
    DialogSettings.window("Information About Game of life Simulation", `
            <p>on based Game of life by john conway</p>
            <p>Game of life is simulation of life cycle cells,Only have 3 rules</p>
            <p><span class="fa-solid fa-square" style="color: ${getPalet().cell[3]}"></span> | <span class="fa-solid fa-square" style="color: ${getPalet().cell[2]}"></span> if cell is life and neighbors is more 3 die cell</p>
            <p><span class="fa-solid fa-square" style="color: ${getPalet().cell[3]}"></span> | <span class="fa-solid fa-square" style="color: ${getPalet().cell[2]}"></span> if cell is life and neighbors is less 2 die cell</p>
            <p>if cell is die and have 3 neighbors, born new cell<span class="fa-solid fa-square" style="color: ${getPalet().cell[3]}"></span> | <span class="fa-solid fa-square" style="color: ${getPalet().cell[2]}"></span></p>
            
            <h2>Cell States</h2>
            <p><span class="fa-solid fa-square" style="color: ${getPalet().cell[2]}"></span> if born cell</p>
            <p><span class="fa-solid fa-square" style="color: ${getPalet().cell[3]}"></span> if cell is alive before generation</p>
            <p><span class="fa-solid fa-square" style="color: ${getPalet().cell[1]}"></span> if cell recent die</p>
            `);
  }
}
