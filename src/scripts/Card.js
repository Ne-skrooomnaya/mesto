import { popupFormPhoto} from './utils.js';

export class Card {
  constructor(item, cardSelector, {handleCardClick} ) {
    this._name = item.name
    this._link = item.link
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    
    return cardElement;
  }

  _likeCard = () => {
    this._userElement.querySelector('.element__like').classList.toggle('element__like_active')
  }

  _deleteCard() {
    this._userElement.remove();
    this._userElement = null;
  }

  // _handlePopupPhoto() {
  //   popupFormPhoto.querySelector('.popup__image').src = this._link;
  //   popupFormPhoto.querySelector('.popup__photo-text').textContent = this._name;
  //   openPopup(popupFormPhoto);  
  // }

  _setEventListeners() {
    this._userElement.querySelector('.element__like').addEventListener('click', () => {
      this._likeCard();
    });

    this._userElement.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard();
    });

    // this._userElement.querySelector('.element__image').addEventListener('click', () => {
    //   this._handlePopupPhoto();
    // });

    this._userElement.querySelector('.element__image').addEventListener('click', this._handleCardClick);
  }

  createCard = () => {
    this._userElement = this._getTemplate();
    this._setEventListeners();
        
    this._userElement.querySelector('.element__image').src =  this._link;
    this._userElement.querySelector('.element__image').alt =  this._name;
    this._userElement.querySelector('.element__title').textContent =  this._name;

    return this._userElement;
  };
}

export default Card;