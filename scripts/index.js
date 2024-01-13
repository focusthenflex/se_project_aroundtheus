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

// Elements
const MODAL_OPENED_CLASS = "modal_opened";

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
const profileNameField = document.querySelector("#profile-title-input");
const editProfileSaveButton = document.querySelector(
  "#edit-profile-save-button"
);

const editProfileForm = document.querySelector("#edit-profile-form");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardListEl = document.querySelector("#cards-list");

// Functions
function openEditProfileModal() {
  profileEditModal.classList.add(MODAL_OPENED_CLASS);
}

function closeEditProfileModal() {
  profileEditModal.classList.remove(MODAL_OPENED_CLASS);
}

function updateProfileInfo(newProfileName, newProfileDescription) {
  profileName.textContent = newProfileName;
  profileDescription.textContent = newProfileDescription;
}

function fillProfileEditForm() {
  profileNameField.value = profileName.textContent.trim();
  profileDescriptionField.value = profileDescription.textContent.trim();
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardButtonEl = cardElement.querySelector(".card__like-button");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  cardButtonEl.ariaLabel = `${data.name} Like Button`;
  return cardElement;
}

// Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  const profileNameVal = profileNameField.value.trim();
  const profileDescriptionVal = profileDescriptionField.value.trim();
  updateProfileInfo(profileNameVal, profileDescriptionVal);
  closeEditProfileModal();
}

function handleOpenProfileEditForm() {
  fillProfileEditForm();
  // Remove whitespace
  openEditProfileModal();
}

// Event Listeners

editProfileModalCloseButton.addEventListener("click", closeEditProfileModal);

editProfileForm.addEventListener("submit", handleProfileEditSubmit);

profileEditButton.addEventListener("click", handleOpenProfileEditForm);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
