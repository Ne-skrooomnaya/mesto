export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
    this._avatarSelector = avatarSelector;
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descriptionSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent,
    } 
  }

  setUserInfo(formName, formDescription) {
    this._userName.textContent = formName;
    this._userDescription.textContent = formDescription;
  }

  setUserAvatar(formAvatar) {
    this._userAvatar.src = formAvatar;
  }
}