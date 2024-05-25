import {
  MODAL_OPENED_CLASS,
  MODAL_CLOSE_BUTTON_SELECTOR,
  MODAL_CLASS_SELECTOR,
} from "../utils/constants.js";

export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._closeButton = this._modalElement.querySelector(
      `.${MODAL_CLOSE_BUTTON_SELECTOR}`
    );
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  enableLoadingState(loadingText) {
    this.addWaitState();
    this.toggleLoadingText(true, loadingText);
  }

  disableLoadingState() {
    this.removeWaitState();
    this.toggleLoadingText();
  }

  addWaitState() {
    this._modalElement.classList.add("modal_opened-wait");
  }

  removeWaitState() {
    this._modalElement.classList.remove("modal_opened-wait");
  }

  open() {
    this._modalElement.classList.add(MODAL_OPENED_CLASS);
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._modalElement.classList.remove(MODAL_OPENED_CLASS);
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleMousedownClose = (evt) => {
    if (
      evt.target.classList.contains(MODAL_CLASS_SELECTOR) ||
      evt.target.classList.contains(MODAL_CLOSE_BUTTON_SELECTOR)
    ) {
      this.close();
    }
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") this.close();
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", close);
    this._modalElement.addEventListener(
      "mousedown",
      this._handleMousedownClose
    );
  }

  toggleLoadingText(isLoading, loadingText = "Saving...") {
    if (!this._submitButton) return;
    this._submitButton.textContent = isLoading
      ? loadingText
      : this._initialButtonTextContent;
  }
}
