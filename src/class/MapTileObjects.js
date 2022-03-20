"use strict";

class MapTileObjects {
  Objects = [];
  constructor(width, height) {
    this.width = width;
    this.height = height;
  };
  resize(width = 0, height = 0) {
    this.width = width;
    this.height = height;
  };
  clearObjects() {
    this.Objects = [];
  };
  setWidth(x = 0) {
    this.width = x;
  };
  setHeight(y = 0) {
    this.height = y;
  };
  logArray() {
    console.log(this.Objects);
  };
  tableArray() {
    console.table(this.Objects);
  };
  forEach(cons = (value = 0, index = 0, array) => {}) {
    this.Objects.forEach(cons);
  };
  setObject(index = Number, obj = Object) {
    this.Objects[index] = obj;
  };
  getObject(index = Number) {
    return this.Objects[index];
  };
  getObjectPos(x = 0, y = 0) {
    if (x > this.width - 1 || x < 0 || y > this.height || y < 0) return null;
    return this.getObject(this.getIndexPos(x, y));
  };
  getIndexPos(x = 0, y = 0) {
    return y * this.width + x;
  };
  setObjectPos(x = 0, y = 0, obj = {}){
    this.setObject(this.getIndexPos(x, y), obj);
  };
  getArray() {
    return this.Objects;
  };
}
