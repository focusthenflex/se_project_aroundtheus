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
const CARD_LIKED_CLASS = "card__like-button_active_true";
const MODAL_CLASS_SELECTOR = "modal";

const profileAvatar = document.querySelector("#profile-avatar");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const editProfileModalCloseButton = document.querySelector(
  "#edit-profile-modal-close-button"
);
const profileName = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");

const profileDescriptionField = document.querySelector(
  "#profile-description-input"
);
const profileNameField = document.querySelector("#profile-name-input");
const editProfileSaveButton = document.querySelector(
  "#edit-profile-save-button"
);

const editProfileForm = document.forms["edit-profile-form"];

const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector("#add-card-button");
const addCardModalCloseButton = document.querySelector(
  "#add-card-modal-close-button"
);
const addCardForm = document.forms["add-card-form"];
const addCardSubmitButton = addCardForm.querySelector('button[type="submit"]');
const editCardSubmitButton = editProfileForm.querySelector(
  'button[type="submit"]'
);
const addCardInputs = Array.from(addCardForm.querySelectorAll("input"));
const editCardInputs = Array.from(editProfileForm.querySelectorAll("input"));

const newCardTitleField = document.querySelector("#add-card-title-input");
const newCardURLField = document.querySelector("#add-card-url-input");
const addCardSaveButton = document.querySelector("#add-card-create-button");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardListEl = document.querySelector("#cards-list");

const picturePreviewModalImage = document.querySelector(
  "#picture-preview-image"
);
const picturePreviewModal = document.querySelector("#picture-preview-modal");
const picturePreviewModalCloseButton = document.querySelector(
  "#picture-preview-close-button"
);

const pictureCaption = document.querySelector("#picture-preview-caption");
const modals = document.querySelectorAll(`.${MODAL_CLASS_SELECTOR}`);

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

function createHypenatedCardName({ name }) {
  const lowerCasedName = name.toLowerCase();
  const trimmedLocationName = lowerCasedName.trim();
  const splitName = trimmedLocationName.split(" ");
  return splitName.join("-");
}

function updateLikeButton(button) {
  button.classList.toggle(CARD_LIKED_CLASS);
}

function toggleImageModal({ name, link }) {
  const previewImageSrc = picturePreviewModalImage.src;
  picturePreviewModalImage.src = link;
  pictureCaption.textContent = name;

  toggleModal(picturePreviewModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardId = createHypenatedCardName(data);
  const cardLikeButtonEl = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.id = cardId;

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardImageEl.addEventListener("click", () => toggleImageModal(data));

  cardTitleEl.textContent = data.name;

  cardLikeButtonEl.ariaLabel = `${data.name} Like Button`;
  cardLikeButtonEl.id = `${cardId}-like-button`;
  cardLikeButtonEl.addEventListener("click", () =>
    updateLikeButton(cardLikeButtonEl)
  );

  cardDeleteButton.id = `${cardId}-delete-button`;
  cardDeleteButton.addEventListener("click", () => cardElement.remove());

  return cardElement;
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

function handleOpenProfileEditForm() {
  fillProfileEditForm();
  handleOpenModalValidation(
    editProfileForm,
    editCardInputs,
    editCardSubmitButton,
    config
  );

  toggleModal(profileEditModal);
}

function handleOpenModalValidation(
  formEl,
  inputEls,
  submitButton,
  options,
  newAddCard = false
) {
  inputEls.forEach((inputEl) => {
    checkInputValidity(formEl, inputEl, options, newAddCard);
  });
  toggleButtonState(inputEls, submitButton, options);
}

function handleOpenAddCardForm() {
  const newAddCard = addCardInputs.every((inputEl) => inputEl.value === "");
  handleOpenModalValidation(
    addCardForm,
    addCardInputs,
    addCardSubmitButton,
    config,
    newAddCard
  );
  toggleModal(addCardModal);
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
    // evt.currentTarget is the element on which the listener was set
    toggleModal(evt.currentTarget);
  }
};

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", handleOpenProfileEditForm);

addCardButton.addEventListener("click", handleOpenAddCardForm);

editProfileForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddCardSubmit);
picturePreviewModalCloseButton.addEventListener("click", toggleImageModal);
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
