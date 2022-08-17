export default class Container {
  list;

  constructor() {
    this.list = [];
  }

  contains(key, value) {
    if (key === null || value === null) return false;
    return this.list.find((o) => o[key] === value) !== undefined;
  }

  add(object, hasKey = null, equalToValue = null) {
    if (hasKey !== null
        && equalToValue !== null
        && this.contains(hasKey, equalToValue)) {
      return false;
    }
    this.list.push(object);
    return true;
  }

  insert(object, index) {
    this.list.splice(index, 0, object);
  }

  delete(key, value) {
    if (key === null || key === undefined) return false;
    if (value === null || value === undefined) return false;
    const oldLength = this.list.length;
    this.list = this.list.filter((o) => o[key] !== value);
    return (oldLength - this.list.length) > 0;
  }

  get(key, value) {
    return this.list.find((o) => o[key] === value);
  }

  getAll() {
    return this.list;
  }

  erase() {
    this.list = [];
  }

  isEmpty() {
    return this.list.length === 0;
  }
}
