import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithFormSubmit from "../components/ModalWithFormSubmit.js";
import UserInfo from "../components/UserInfo.js";
import { config } from "../utils/constants.js";
import Api from "../components/Api.js";
import "./index.css";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Button Elements ---------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#add-card-button");
const editAvatarButton = document.querySelector(
  "#profile-avatar-update-button"
);

const profileDescriptionField = document.querySelector(
  "#profile-description-input"
);
const profileNameField = document.querySelector("#profile-name-input");

/* ------------------------------ Form Elements ----------------------------- */

const editProfileForm = document.forms["edit-profile-form"];
const addCardForm = document.forms["add-card-form"];
const editAvatarForm = document.forms["edit-avatar-form"];
const deleteCardForm = document.forms["confirm-delete-form"];

/* ------------------------------- Validators ------------------------------- */

const addCardValidator = new FormValidator(addCardForm, config);
const editProfileValidator = new FormValidator(editProfileForm, config);
const editAvatarValidator = new FormValidator(editAvatarForm, config);
const deleteCardValidator = new FormValidator(deleteCardForm, config);

addCardValidator.enableValidation();
editProfileValidator.enableValidation();
editAvatarValidator.enableValidation();

let userId = null;
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function createCard(data) {
  const card = new Card(
    {
      data,
      handleImageClick: () => {
        picturePreviewModal.open(data);
      },
      handleLikeClick: (card) => {
        api
          .updateCardLike(card)
          .then(() => {
            card.updateLikeButton();
          })
          .catch((err) => console.error(err));
      },
      handleDeleteClick: (card) => {
        const modal = deleteConfirmationModal;
        const validator = deleteCardValidator;
        modal.open();
        modal.setSubmitAction(() => {
          validator.disableFormElements();
          modal.enableLoadingState("Deleting...");
          api
            .deleteCard(card.getCardID())
            .then(() => {
              card.deleteCard();
              modal.toggleLoadingText(true, "Deleted!");
              modal.closeAfterSuccessfulSubmission(deleteCardValidator);
              validator.enableFormElements();
            })
            .catch((err) => {
              console.error(err);
              window.alert(`${err}`);
            })
            .finally(() => {
              modal.toggleLoadingText(false);
            });
        });
      },
    },
    "#card-template"
  );
  return card.getView();
}

/* -------------------------------------------------------------------------- */
/*                                  Instantiations                            */
/* -------------------------------------------------------------------------- */

const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4b03e5e2-04ef-492f-b466-56323ec84b15",
    "Content-Type": "application/json",
  },
});

/* ------------------------- User Info Instantiation ------------------------ */
const userInfo = new UserInfo({
  profileNameSelector: config.profileNameSelector,
  profileDescriptionSelector: config.profileDescriptionSelector,
  avatarSelector: config.avatarSelector,
});

/* -------------------------- Modal Initializations ------------------------- */

const picturePreviewModal = new ModalWithImage({
  modalSelector: "#picture-preview-modal",
});

const profileEditModal = new ModalWithForm({
  modalSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});

const addCardModal = new ModalWithForm({
  modalSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardSubmit,
});

const deleteConfirmationModal = new ModalWithFormSubmit({
  modalSelector: config.deleteCardPopupSelector,
});

const editAvatarModal = new ModalWithForm({
  modalSelector: "#avatar-edit-modal",
  handleFormSubmit: handleEditAvatarSubmit,
});

/* -------------------------- Section Instantiation ------------------------- */

const section = new Section(
  {
    renderer: (data) => {
      section.addItem(createCard(data));
    },
  },
  config.sectionSelector
);

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit({ name, description }) {
  const modal = profileEditModal;
  const validator = editProfileValidator;

  validator.disableFormElements();
  modal.enableLoadingState("Saving...");
  userInfo.setUserInfo({ name, description });

  api
    .updateProfile({ name, about: description })
    .then(() => {
      modal.toggleLoadingText(true, "Saved!");
      modal.closeAfterSuccessfulSubmission(editProfileValidator);
      validator.enableFormElements();
    })
    .catch((err) => {
      console.error(err);
      window.alert(`${err}`);
    })
    .finally(() => {
      modal.toggleLoadingText();
    });
}

function handleProfileEditOpen() {
  const { name, description } = userInfo.getUserInfo();
  profileNameField.value = name;
  profileDescriptionField.value = description;
  profileEditModal.open();
}

function handleAddCardSubmit({ title, url }) {
  const validator = addCardValidator;
  const modal = addCardModal;

  const name = title.trim();
  const link = url.trim();

  const cardData = {
    name,
    link,
  };

  validator.disableFormElements();
  modal.enableLoadingState("Creating...");

  api
    .createNewCard(cardData)
    .then((data) => {
      section.addItem(createCard(data), "prepend");
      modal.toggleLoadingText(true, "Created!");

      modal.closeAfterSuccessfulSubmission(addCardValidator);
      validator.enableFormElements();
    })
    .catch((err) => {
      console.error(err);
      window.alert(`${err}`);
    })
    .finally(() => {
      modal.toggleLoadingText();
    });
}

function handleEditAvatarSubmit({ avatar }) {
  const modal = editAvatarModal;
  const validator = editAvatarValidator;

  validator.disableFormElements();
  modal.enableLoadingState("Updating...");

  api
    .updateAvatar({ avatar })
    .then(({ avatar }) => {
      userInfo.setUserInfo({ avatar });
      modal.toggleLoadingText(true, "Updated!");
      modal.closeAfterSuccessfulSubmission();
      validator.enableFormElements();
    })
    .catch((err) => {
      console.error(err);
      window.alert(`${err}`);
    })
    .finally(() => {
      modal.toggleLoadingText();
    });
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", handleProfileEditOpen);

addCardButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  addCardModal.open();
});

editAvatarButton.addEventListener("click", () => {
  editAvatarModal.open();
});

picturePreviewModal.setEventListeners();
profileEditModal.setEventListeners();
addCardModal.setEventListeners();
deleteConfirmationModal.setEventListeners();
editAvatarModal.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                 Initializer                                */
/* -------------------------------------------------------------------------- */

api
  .getAppInfo()
  .then(([initialCards, userInformation]) => {
    userInfo.setUserInfo({
      name: userInformation.name,
      description: userInformation.about,
      avatar: userInformation.avatar,
    });
    section.renderItems(initialCards);
  })
  .catch((err) => {
    console.error(`${err}`);
    window.alert(`${err}`);
  });
