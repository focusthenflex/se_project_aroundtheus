import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor({ modalSelector, handleFormSubmit }) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = [...this._modalForm.querySelectorAll("input")];
  }

  close() {
    super.close();
    this._modalForm.reset();
  }

  open() {
    super.open();
  }

  _getInputValues() {
    const data = {};
    this._inputElements.forEach((inputField) => {
      data[inputField.name] = inputField.value;
    });

    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", () => {
      const data = this._getInputValues();
      this._handleFormSubmit(data);
      this._modalForm.reset();
      this.close();
    });
  }
}
