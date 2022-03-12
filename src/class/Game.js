import SettingsUi from "/src/class/SettingsUi.js";
import MapTileObjects from "/src/class/MapTileObjects.js";
import Cell from "/src/class/Cell.js";

export default class Game {
  loop = null;
  canUpdate = true;
  sleepUpdate = 0;
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.settingUi = new SettingsUi("setting-ui");
    this.init();
  };
  //on start game
  on() {
    this.loop = window.requestAnimationFrame(() => this.tick());
  };
  //init
  init() {
    //add Event
    this.canvas.addEventListener("click", this.click, false);
    this.canvas.addEventListener("dragstart",() =>  this.settingUi.showSettings(), false);
    
    //set width and height canvas
    this.canvas.width = innerWidth
    this.canvas.height = innerHeight;
    //rows and colmns 
    this.mapWidth = Math.floor(Math.max(this.canvas.width / window.vars.tileSize));
    this.mapHeight = Math.floor(Math.max(this.canvas.height / window.vars.tileSize));
    this.padding = this.toY((this.toTileX(innerWidth) + this.toTileY(innerHeight)) - (this.mapWidth + this.mapHeight));

    this.map = new MapTileObjects(this.mapWidth, this.mapHeight);
    this.createCells();
  };
  //tick function
  tick() {
    this.sleepUpdate += 1;
    if (this.sleepUpdate >= window.vars.updateTime && this.canUpdate) {
      this.sleepUpdate = 0;
      this.update();
    }

    this.draw();
    this.loop = window.requestAnimationFrame(() => this.tick());
  };
  update() {
    this.cycle();
    this.nextCycle();
  };
  //set next state cycle to cells
  cycle() {
    this.map.forEach((value) => this.checkNeighbors(value));
  };
  //set state to cells
  nextCycle() {
    this.map.forEach((value) => { value.swichtState() });
  };
  drawBackground(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, innerWidth, innerHeight);
  };
  /*
   * Draw all in canvas context
   */
  draw() {
    this.drawBackground(this.ctx);
    this.drawEntity();
    this.drawHex(this.ctx);
    this.drawDecal(this.ctx);
  };
  drawEntity() {
    this.map.forEach((value) => {
      value.draw(this.ctx);
    });
  };
  drawHex(ctx) {
    for (let y = 0; y <= this.mapHeight; y++) {
      for (var x = 0; x <= this.mapWidth; x++) {
        ctx.beginPath();
        ctx.moveTo(x * window.vars.tileSize, 0);
        ctx.lineTo(x * window.vars.tileSize, innerHeight);
        ctx.moveTo(0, y * window.vars.tileSize);
        ctx.lineTo(innerWidth, y * window.vars.tileSize);
        ctx.strokeStyle = window.vars.darkMode ? "#1E202C" : "white";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  };
  drawDecal(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, innerHeight);
    ctx.moveTo(innerWidth, 0);
    ctx.lineTo(innerWidth, innerHeight);
    ctx.moveTo(0, 0);
    ctx.lineTo(innerWidth, 0);
    ctx.moveTo(0, innerHeight);
    ctx.lineTo(innerWidth, innerHeight);
    ctx.strokeStyle = window.vars.darkMode ? "#1E202C" : "white";
    ctx.lineWidth = this.padding;
    ctx.stroke();
  };
  createCells() {
    for (let y = 0; y <= this.mapHeight; y++) {
      for (let x = 0; x <= this.mapWidth; x++) {
        this.map.setObjectPos(x, y, new Cell(this.toX(x), this.toY(y)));
      }
    }
  };
  checkNeighbors(cell = Cell) {
    let enumNeighbors = this.getEnumNeighbors(cell.tileX(), cell.tileY());
    if (!cell.state && enumNeighbors === 3) cell.setNextState(true);
    if (cell.state && enumNeighbors < 4 && enumNeighbors > 1) cell.setNextState(true);
    if (cell.state && (enumNeighbors < 2 || enumNeighbors > 3)) cell.setNextState(false);
  };
  getEnumNeighbors(x, y) {
    return this.getAliveCell(x - 1, y) + this.getAliveCell(x + 1, y) + this.getAliveCell(x, y - 1) + this.getAliveCell(x, y + 1) + this.getAliveCell(x - 1, y - 1) + this.getAliveCell(x + 1, y + 1) + this.getAliveCell(x + 1, y - 1) + this.getAliveCell(x - 1, y + 1);
  };
  stopLoop() {
    window.cancelAnimationFrame(this.loop);
    this.sleepUpdate = 0;
  };
  continueLoop() {
    this.loop = window.requestAnimationFrame(() => this.tick());
  };
  turnCanUpdate() {
    this.canUpdate = !this.canUpdate;
  };
  resetCells() {
    this.map.forEach((cell) => {
      cell.setState(false);
    });
    this.sleepUpdate = 0;
  };
  getAliveCell(x, y) {
    let cell = this.getCell(x, y);

    return cell != null && cell.state ? 1 : 0;
  };
  getCell(x, y) {
    return this.map.getObjectPos(x, y);
  };
  generationRandomState() {
    this.map.forEach((cell) => {
      cell.setState(Math.random() < 0.5);
    })
  };
  click(event = Event) {
    if (event.layerX || event.layerX == 0) {
      event._x = event.layerX;
      event._y = event.layerY;
    } else if (event.offsetX || event.offsetX == 0) {
      event._x = event.offsetX;
      event._y = event.offsetY;
    }

    let x = Math.floor(window.game.toTileX(event._x)),
      y = Math.floor(window.game.toTileY(event._y));
    let cell = window.game.map.getObjectPos(x, y);

    cell.setState(!cell.state);
  };
  toX(x) {
    return x * window.vars.tileSize;
  };
  toY(y) {
    return y * window.vars.tileSize;
  };
  toTileX(x) {
    return x / window.vars.tileSize;
  };
  toTileY(y) {
    return y / window.vars.tileSize;
  };
}
