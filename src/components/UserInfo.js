export default class UserInfo {
  constructor({
    profileNameSelector,
    profileDescriptionSelector,
    avatarSelector,
  }) {
    this._nameElement = document.querySelector(profileNameSelector);
    this._descriptionElement = document.querySelector(
      profileDescriptionSelector
    );
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    // TODO: Do we need to return avatar here?
    return {
      name: this._nameElement.textContent.trim(),
      description: this._descriptionElement.textContent.trim(),
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, description, avatar }) {
    if (name) this._nameElement.textContent = name.trim();
    if (description) this._descriptionElement.textContent = description.trim();
    if (avatar) this._avatarElement.src = avatar;
  }
}
