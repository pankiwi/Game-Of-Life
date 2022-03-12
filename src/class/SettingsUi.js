export default class SettingsUi {
  constructor(idSetting,) {
    this.settingUi = document.getElementById(idSetting);
    this.btns = [];
    for (let btn of this.settingUi.getElementsByTagName("button")) {
      this.btns.push(btn);
    }
    this.init();
  }
  init() {
    this.btns[0].addEventListener("click", () => la.dissableSettings(), false);
    this.btns[1].addEventListener("click", () => window.game.generationRandomState(), false);
    this.btns[2].addEventListener("click", () => this.turnUpdate(), false);
    this.btns[3].addEventListener("click", () => window.game.resetCells(), false);
    this.btns[4].addEventListener("click", () => this.setTimeUpdate(), false);
    this.btns[5].addEventListener("click", () => this.changeTheme(), false);
     this.btns[6].addEventListener("click", () => this.info(), false);
  }
  //active settings
  showSettings() {
    if (!this.settingUi.classList.contains("showSettings")) {
      this.settingUi.classList.add("showSettings");
      this.btns.forEach((btn) => {
        btn.classList.add("showBtn");
      })
    }
  };
  //disable settings
  dissableSettings() {
    if (this.settingUi.classList.contains("showSettings")) {
      this.settingUi.classList.remove("showSettings");
      this.btns.forEach((btn) => {
        btn.classList.remove("showBtn");
      })
    }
  };

  github() {
    window.location.href = "https://github.com/pankiwi";
  };

  setTimeUpdate() {
    let StringInput = prompt("set time update", window.vars.updateTime);
    let input = parseFloat(StringInput);

    if (input > 0) {
      window.vars.updateTime = input;
    } else if (!input > 0) {
      alert(`number ${StringInput} is not valid`);
    } else {
      alert(`is not number ${StringInput}`);
    }
  };
  turnUpdate() {
    window.game.turnCanUpdate();
    let btn = this.btns[2];
    let span = btn.getElementsByTagName("span")[0]
    if (window.game.canUpdate) {
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
  };

  info() {
    //noice info 
    alert("Keep click for open settings");
  };

  changeTheme() {
    window.vars.darkMode = !window.vars.darkMode;

    let btn = this.btns[5];
    let span = btn.getElementsByTagName("span")[0]
    if (window.vars.darkMode) {
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
  }
}
