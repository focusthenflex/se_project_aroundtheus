const CARD_LIKED_CLASS = "card__like-button_active_true";

export default class Card {
  constructor(
    { data, handleImageClick, handleLikeClick, handleDeleteClick },
    cardSelector
  ) {
    this.name = data.name;
    this.link = data.link;

    this.isLiked = data.isLiked;
    this._owner = data.owner;
    this._createdAt = data.createdAt;

    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._id = data._id;
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCardID() {
    return this._id;
  }

  _setEventListeners() {
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._cardLikeButtonEl.addEventListener("click", () => {
      this._handleLikeClick(this);
    });
  }

  updateLikeButton = () => {
    this._cardLikeButtonEl.classList.toggle(CARD_LIKED_CLASS);
  };

  _createHypenatedCardName() {
    const lowerCasedName = this.name.toLowerCase();
    const trimmedLocationName = lowerCasedName.trim();
    const splitName = trimmedLocationName.split(" ");
    return splitName.join("-");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement.id = this._createHypenatedCardName(this.name);

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardImageEl.src = this.link;
    this._cardImageEl.alt = this.name;
    this._cardImageEl.id = `${this._cardImageEl}-preview-image`;

    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardTitleEl.textContent = this.name;

    this._cardLikeButtonEl =
      this._cardElement.querySelector(".card__like-button");
    this._cardLikeButtonEl.id = `${this._cardElement.id}-like-button`;
    if (this.isLiked) this._cardLikeButtonEl.classList.add(CARD_LIKED_CLASS);

    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardDeleteButton.id = `${this._cardElement.id}-delete-button`;

    this._setEventListeners();

    return this._cardElement;
  }
}
