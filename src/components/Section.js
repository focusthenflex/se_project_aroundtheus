export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(`#${containerSelector}`);
  }

  renderItems(items) {
    items.forEach(this._renderer);
  }

  addItem(element, method = "append") {
    this._container[method](element);
  }
}
