const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// enabling validation by calling enableValidation()
// pass all the settings on call
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (inputEl.validity.valid) {
    hideInputError(formEl, inputEl, options);
  } else {
    showInputError(formEl, inputEl, options);
  }
}

function hasValidInput(inputList) {
  return inputList.every((input) => input.validity.valid);
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasValidInput(inputEls)) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  } else {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".modal__button");
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(config) {
  const formSelector = config.formSelector;
  const formEls = [...document.querySelectorAll(config.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    setEventListeners(formEl, config);
  });
}

enableValidation(config);
