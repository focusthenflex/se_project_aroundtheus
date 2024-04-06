import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const MODAL_OPENED_CLASS = "modal_opened";
const MODAL_CLASS_SELECTOR = "modal";

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileName = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");

const profileDescriptionField = document.querySelector(
  "#profile-description-input"
);
const profileNameField = document.querySelector("#profile-name-input");

const editProfileForm = document.forms["edit-profile-form"];
const addCardForm = document.forms["add-card-form"];

const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector("#add-card-button");

const newCardTitleField = document.querySelector("#add-card-title-input");
const newCardURLField = document.querySelector("#add-card-url-input");

const cardListEl = document.querySelector("#cards-list");

const picturePreviewModalImage = document.querySelector(
  "#picture-preview-image"
);
const picturePreviewModal = document.querySelector("#picture-preview-modal");

const pictureCaption = document.querySelector("#picture-preview-caption");
const modals = document.querySelectorAll(`.${MODAL_CLASS_SELECTOR}`);

const addCardValidator = new FormValidator(addCardForm, config);
const editProfileValidator = new FormValidator(editProfileForm, config);

addCardValidator.enableValidation();
editProfileValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function toggleModal(modal) {
  modal.classList.toggle(MODAL_OPENED_CLASS);

  if (modal.classList.contains(MODAL_OPENED_CLASS)) {
    document.addEventListener("keyup", handleEsc);
  } else {
    document.removeEventListener("keyup", handleEsc);
  }
}

function checkForEscape(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(`.${MODAL_OPENED_CLASS}`);
    toggleModal(modal);
  }
}

function updateProfileInfo(newProfileName, newProfileDescription) {
  profileName.textContent = newProfileName;
  profileDescription.textContent = newProfileDescription;
}

function fillProfileEditForm() {
  profileNameField.value = profileName.textContent.trim();
  profileDescriptionField.value = profileDescription.textContent.trim();
}

function toggleImageModal({ _name, _link }) {
  picturePreviewModalImage.src = _link;
  pictureCaption.textContent = _name;
  picturePreviewModalImage.alt = _name;

  toggleModal(picturePreviewModal);
}

function getCardElement(data) {
  return new Card(data, "#card-template", toggleImageModal).getView();
}

function addCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function resetInputElements({ target }) {
  target.reset();
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  const profileNameVal = profileNameField.value.trim();
  const profileDescriptionVal = profileDescriptionField.value.trim();
  updateProfileInfo(profileNameVal, profileDescriptionVal);
  toggleModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = newCardTitleField.value.trim();
  const link = newCardURLField.value.trim();
  const cardData = {
    name,
    link,
  };
  addCard(cardData);
  resetInputElements(e);
  toggleModal(addCardModal);
}

function handleOpenModalValidation(modal, formValidator) {
  if (modal === profileEditModal) fillProfileEditForm();
  formValidator.resetValidation();
  toggleModal(modal);
}

function handleEsc(evt) {
  evt.preventDefault();
  checkForEscape(evt);
}

const handleModalClose = (evt) => {
  if (
    evt.target.classList.contains(MODAL_CLASS_SELECTOR) ||
    evt.target.classList.contains("modal__close")
  ) {
    toggleModal(evt.currentTarget);
  }
};

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  handleOpenModalValidation(profileEditModal, editProfileValidator);
});

addCardButton.addEventListener("click", () => {
  handleOpenModalValidation(addCardModal, addCardValidator);
});

editProfileForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddCardSubmit);
modals.forEach((modal) => {
  modal.addEventListener("mousedown", handleModalClose);
});

/* -------------------------------------------------------------------------- */
/*                                 Initializer                                */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
