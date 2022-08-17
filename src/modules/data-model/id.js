export default class ID {
  id = 1;

  constructor(initID = 0) {
    this.id = initID ?? 1;
  }

  next() {
    this.id += 1;
    return this.id;
  }

  set(id) {
    this.id = id;
  }

  get() {
    return this.id;
  }

  toString() {
    return this.id.toString();
  }

  toJSON() {
    return this.id;
  }
}
