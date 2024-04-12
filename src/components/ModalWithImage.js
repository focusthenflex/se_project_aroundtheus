import Modal from "./Modal";

export default class ModalWithImage extends Modal {
  constructor({ modalSelector }) {
    super({ modalSelector });
    this._modalImage = this._modalImage = this._modalElement.querySelector(
      "#picture-preview-image"
    );
    this._modalCaption = this._modalElement.querySelector(
      "#picture-preview-caption"
    );
    this.open = this.open.bind(this);
  }

  open({ link, name }) {
    this._modalImage.src = link;
    this._modalImage.alt = name;
    this._modalCaption.textContent = name;
    super.open();
  }
}
