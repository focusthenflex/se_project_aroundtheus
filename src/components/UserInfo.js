export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._nameElement = document.querySelector(`#${profileNameSelector}`);
    this._descriptionElement = document.querySelector(
      `#${profileDescriptionSelector}`
    );
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      description: this._descriptionElement.textContent.trim(),
    };
  }

  setUserInfo({ name, description }) {
    this._nameElement.textContent = name.trim();
    this._descriptionElement.textContent = description.trim();
  }
}
