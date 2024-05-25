import Modal from "./Modal.js";
import { config } from "../utils/constants.js";

class ModalWithFormSubmit extends Modal {
  constructor({ modalSelector }) {
    super({ modalSelector });
    this._submitButton = this._modalElement.querySelector("form button");
    this._initialButtonTextContent = this._submitButton.textContent.trim();
    this._settings = config;
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    this._modalElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });

    super.setEventListeners();
  }

  closeAfterSuccessfulSubmission(validator) {
    this.close();
    this.removeWaitState();
    this.toggleLoadingText();
  }
}

export default ModalWithFormSubmit;
