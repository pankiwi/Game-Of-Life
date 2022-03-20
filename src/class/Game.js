"use strict";

class Game {
  loop = null;
  canUpdate = true;
  sleepUpdate = 0;
  updateTime = 20;
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.init();
  };
  //on start game
  on() {
    this.loop = window.requestAnimationFrame(() => this.tick());
  };
  //init
  init() {
    //set width and height canvas
    this.canvas.width = innerWidth
    this.canvas.height = innerHeight;
    //rows and colmns 
    this.mapWidth = Math.floor(Math.max(this.canvas.width / tileSize));
    this.mapHeight = Math.floor(Math.max(this.canvas.height / tileSize));

    this.map = new MapTileObjects(this.mapWidth, this.mapHeight);
    
    this.createCells();
  };
  //tick function
  tick() {
    this.sleepUpdate += 1;
    if (this.updateTime < 0 || (this.sleepUpdate >= this.updateTime && this.canUpdate)) {
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
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = getPalet().background;
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
        ctx.moveTo(x * tileSize, 0);
        ctx.lineTo(x * tileSize, innerHeight);
        ctx.moveTo(0, y * tileSize);
        ctx.lineTo(innerWidth, y * tileSize);
        ctx.strokeStyle = getPalet().hex;
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
    ctx.strokeStyle = getPalet().hex;
    ctx.lineWidth = 10 * innerWidth/innerHeight;
    ctx.stroke();
  };
  createCells() {
    for (let y = 0; y <= this.mapHeight; y++) {
      for (let x = 0; x <= this.mapWidth; x++) {
        this.map.setObjectPos(x, y, new Cell(this.worldCoord(x), this.worldCoord(y)));
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
  getAliveCell(x = 0, y = 0) {
    let cell = this.getCell(x, y);
    return cell != null && cell.state ? 1 : 0;
  };
  getCell(x = 0, y = 0) {
    return this.map.getObjectPos(x, y);
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
  worldCoord(number = 0) {
    return number * tileSize;
  };
  worldTile(number = 0) {
    return number / tileSize;
  };
  getCanvas(){
    return this.canvas;
  };
  getCtx(){
    return this.ctx;
  };
}
