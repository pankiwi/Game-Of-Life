export default class MapTileObjects {
  Objects = [];
  constructor(width, height) {
    this.width = width;
    this.height = height;
  };
  resize(width = Number, height = Number) {
    this.width = width;
    this.height = height;
  };
  clearObjects() {
    this.Objects = [];
  };
  setWidth(x = Number) {
    this.width = x;
  };
  setHeight(y = Number) {
    this.height = y;
  };
  logArray() {
    console.log(this.Objects);
  };
  tableArray() {
    console.table(this.Objects);
  };
  forEach(cons = (value = Object, index = Number, array) => {}) {
    this.Objects.forEach(cons);
  };
  setObjectPos(x = Number, y = Number, obj = Object) {
    this.Objects[this.getIndexPos(x, y)] = obj;
  };
  setObjectArray(index = Number, obj = Object) {
    this.Objects[index] = obj;
  };
  getArray() {
    return this.Objects;
  };
  getObjectPos(x = Number, y = Number) {
    if (x > this.width - 1 || x < 0 || y > this.height || y < 0) return null;
    return this.getObjectArray(this.getIndexPos(x, y));
  };
  getObjectArray(index = Number) {
    return this.Objects[index];
  };
  getIndexPos(x = Number, y = Number) {
    return y * this.width + x;
  };
}
