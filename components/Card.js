const CARD_LIKED_CLASS = "card__like-button_active_true";

export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;

    this._updateLikeButton = this._updateLikeButton.bind(this);
  }

  _setEventListeners() {
    this._cardDeleteButton.addEventListener("click", () => {
      this._cardElement.remove();
      this._cardElement = null;
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._cardLikeButtonEl.addEventListener("click", this._updateLikeButton);
  }

  _updateLikeButton() {
    this._cardLikeButtonEl.classList.toggle(CARD_LIKED_CLASS);
  }

  _createHypenatedCardName() {
    const lowerCasedName = this._name.toLowerCase();
    const trimmedLocationName = lowerCasedName.trim();
    const splitName = trimmedLocationName.split(" ");
    return splitName.join("-");
  }

  getView() {
    // cardImageEl.addEventListener("click", () => toggleImageModal(data));

    // cardTitleEl.textContent = data.name;

    // cardLikeButtonEl.ariaLabel = `${data.name} Like Button`;
    // cardLikeButtonEl.id = `${cardId}-like-button`;
    // cardLikeButtonEl.addEventListener("click", () =>
    //   updateLikeButton(cardLikeButtonEl)
    // );

    // cardDeleteButton.id = `${cardId}-delete-button`;
    // cardDeleteButton.addEventListener("click", () => cardElement.remove());

    // return cardElement;
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement.id = this._createHypenatedCardName(this._name);

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardImageEl.id = `${this._cardImageEl}-preview-image`;

    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardTitleEl.textContent = this._name;

    this._cardLikeButtonEl =
      this._cardElement.querySelector(".card__like-button");
    this._cardLikeButtonEl.id = `${this._cardElement.id}-like-button`;

    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardDeleteButton.id = `${this._cardElement.id}-delete-button`;

    this._setEventListeners();

    return this._cardElement;
  }
}
