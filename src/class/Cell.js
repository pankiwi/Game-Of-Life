export default class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.state = false;
    this.nextState = false;
  };
  draw(ctx) {
    ctx.fillStyle = this.state ? window.vars.darkMode ? "#0015FF" : "#B1B8FF" : window.vars.darkMode ? "#2F3145" : "#EBEBEB";
    ctx.fillRect(this.x, this.y, window.vars.tileSize, window.vars.tileSize);
  };
  setNextState(state = Boolean) {
    this.nextState = state;
  };
  setState(state = Boolean) {
    this.nextState = this.state = state;
  };
  swichtState() {
    this.setState(this.nextState);
  };
  tileX() {
    return this.x / window.vars.tileSize;
  };
  tileY() {
    return this.y / window.vars.tileSize;
  };
}
