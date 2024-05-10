import Modal from "./Modal.js";
import { config } from "../utils/constants.js";

export default class ModalWithForm extends Modal {
  constructor({ modalSelector, handleFormSubmit }) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(config.formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = [...this._modalForm.querySelectorAll("input")];
    this._submitButton = this._modalElement.querySelector("form button");
    this._initialButtonTextContent = this._submitButton.textContent.trim();
  }
  enableLoadingState(loadingText) {
    super.addWaitState();
    this.toggleLoadingText(true, loadingText);
  }

  disableLoadingState() {
    super.removeWaitState();
    this.toggleLoadingText();
  }

  toggleLoadingText(isLoading, loadingText = "Saving...") {
    this._submitButton.textContent = isLoading
      ? loadingText
      : this._initialButtonTextContent;
  }

  close() {
    super.close();
    this._modalForm.reset();
  }

  closeAfterSuccessfulSubmission() {
    this.close();
    this.removeWaitState();
    this.toggleLoadingText();
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
    });
  }
}
