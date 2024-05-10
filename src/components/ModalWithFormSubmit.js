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

  closeAfterSuccessfulSubmission() {
    this.close();
    this.removeWaitState();
    this.toggleButtonState(false);
    this.toggleLoadingText();
  }

  enableLoadingState(loadingText) {
    super.addWaitState();
    this.toggleButtonState(true);
  }

  toggleLoadingText(isLoading, loadingText = "Deleting...") {
    this._submitButton.textContent = isLoading
      ? loadingText
      : this._initialButtonTextContent;
  }

  toggleButtonState(disable = false) {
    if (disable == false) {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }
}

export default ModalWithFormSubmit;
