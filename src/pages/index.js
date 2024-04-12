import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { config, initialCards } from "../utils/constants.js";
import "./index.css";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");

const profileDescriptionField = document.querySelector(
  "#profile-description-input"
);
const profileNameField = document.querySelector("#profile-name-input");

const editProfileForm = document.forms["edit-profile-form"];
const addCardForm = document.forms["add-card-form"];

const addCardButton = document.querySelector("#add-card-button");

const addCardValidator = new FormValidator(addCardForm, config);
const editProfileValidator = new FormValidator(editProfileForm, config);

addCardValidator.enableValidation();
editProfileValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function getCardElement(data) {
  return new Card(
    {
      data,
      handleImageClick: () => {
        picturePreviewModal.open(data);
      },
    },
    "#card-template"
  ).getView();
}

/* -------------------------------------------------------------------------- */
/*                                  Instantiations                            */
/* -------------------------------------------------------------------------- */

const picturePreviewModal = new ModalWithImage({
  modalSelector: "#picture-preview-modal",
});

const profileEditModal = new ModalWithForm({
  modalSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});

const userInfo = new UserInfo({
  profileNameSelector: config.profileNameSelector,
  profileDescriptionSelector: config.profileDescriptionSelector,
});

const addCardModal = new ModalWithForm({
  modalSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardSubmit,
});

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      section.addItem(getCardElement(data));
    },
  },
  config.sectionSelector
);

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit({ name, description }) {
  userInfo.setUserInfo({ name, description });
}

function handleProfileEditOpen() {
  const { name, description } = userInfo.getUserInfo();
  profileNameField.value = name;
  profileDescriptionField.value = description;
  profileEditModal.open();
}

function handleAddCardSubmit({ title, url }) {
  const name = title.trim();
  const link = url.trim();
  const cardData = {
    name,
    link,
  };
  const newCard = getCardElement(cardData);
  section.addItem(newCard, "prepend");
  addCardValidator.resetValidation();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", handleProfileEditOpen);

addCardButton.addEventListener("click", () => {
  addCardModal.open();
});

picturePreviewModal.setEventListeners();
profileEditModal.setEventListeners();
addCardModal.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                 Initializer                                */
/* -------------------------------------------------------------------------- */

section.renderItems(initialCards);
