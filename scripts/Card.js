import { popupFormPhoto, openPopup } from "./index.js";


export class Card {
  constructor(data, cardSelector ) {//popupElement,
    this._name = data._name
    this._link = data._link
    this._cardSelector = cardSelector;
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
        this._userElement.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
        }); 
      }

  _deleteCard() {
    this._userElement.remove();
  }

  _popupPhoto() {
    openPopup(popupFormPhoto);  
      popupFormPhoto.querySelector('.popup__image').alt = this._name;
      popupFormPhoto.querySelector('.popup__image').src = this._link;
      popupFormPhoto.querySelector('.popup__photo-text').textContent = this._name;
  }

  _setEventListeners() {
    this._userElement.querySelector('.element__like').addEventListener('click', () => {
      this._likeCard();
  });

  this._userElement.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard();
  });

  this._userElement.querySelector('.element__image').addEventListener('click', () => {
      this._popupPhoto();
  });
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

// const elementTemplate = '#template-element';

// const card = new Card({ name: '', link: '' }, elementTemplate)

// const cardElement = card.createCard()

// list.prepend(cardElement)
// .content.querySelector('.elements__grid')