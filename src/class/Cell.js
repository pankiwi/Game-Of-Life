"use strict"

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.state = false;
    this.nextState = false;
    this.lastState = null;
  };
  color() {
    if (!this.state && this.lastState) return getPalet().cell[1];

    if (this.state && !this.lastState) return getPalet().cell[2];
    if (this.state && this.lastState) return getPalet().cell[3];

    if (!this.state) return getPalet().cell[0];
  };
  draw(ctx) {
    ctx.fillStyle = this.color();
    ctx.fillRect(this.x, this.y, tileSize, tileSize);
  };
  setNextState(state = false) {
    this.nextState = state;
  };
  setLastState(state = false) {
    this.lastState = state;
  };
  setState(state = false) {
    this.lastState = this.state;
    this.nextState = this.state = state;
  };
  setStrictState(state = false){
    this.lastState = this.nextState = this.state = state;
  }
  swichtState() {
    this.setState(this.nextState);
  };
  tileX() {
    return this.x / tileSize;
  };
  tileY() {
    return this.y / tileSize;
  };
}
