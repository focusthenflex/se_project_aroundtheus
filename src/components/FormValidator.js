export default class FormValidator {
  constructor(formEl, settings) {
    this._settings = settings;
    this._formEl = formEl;
    this._inputEls = Array.from(this._formEl.querySelectorAll("input"));
    this._submitButton = this._formEl.querySelector(
      this._settings.submitButtonSelector
    );
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (event) => event.preventDefault());
    this._setEventListeners();
  }

  disableFormElements() {
    this._inputEls.forEach((inputEl) => {
      inputEl.setAttribute("disabled", true);
    });
    this._toggleButtonState(true);
  }

  enableFormElements() {
    this._inputEls.forEach((inputEl) => {
      inputEl.removeAttribute("disabled", true);
    });
    this._toggleButtonState();
  }

  resetValidation() {
    this._formEl.reset();
    this._inputEls.forEach((inputEl) => this._hideInputError(inputEl));
    this._toggleButtonState();
  }

  _setEventListeners() {
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputEl) {
    if (inputEl.validity.valid) {
      this._hideInputError(inputEl);
    } else {
      this._showInputError(inputEl);
    }
  }

  _hasValidInput(inputList) {
    return inputList.every((input) => input.validity.valid);
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._settings.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._settings.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._settings.errorClass);
  }

  _toggleButtonState(disable = false) {
    if (this._submitButton === null) return;
    if (this._hasValidInput(this._inputEls) && disable == false) {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }
}
