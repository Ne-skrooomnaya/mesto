import { initialCards, configs } from './config.js';
import Card from './Card.js';
import { FormValidator } from './FormValidator.js';
import { popupFormPhoto, closePopup, openPopup } from './utils.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');

const popupFormEdit = document.querySelector('.popup-edit');
const buttonCloseEditProfilePopup = popupFormEdit.querySelector('.popup__close-edit');

const inputName = popupFormEdit.querySelector('#popup__name');
const inputHobby = popupFormEdit.querySelector('#popup__hobby');

const buttonAdd = document.querySelector(".profile__add-button");
const popupFormAdd = document.querySelector('.popup-add');
const buttonCloseAddProfilePopup = popupFormAdd.querySelector('.popup__close-add');

const inputText = popupFormAdd.querySelector('#popup__text');
const inputPhoto = popupFormAdd.querySelector('#popup__photo');
const saveButton = popupFormAdd.querySelector('.popup__save');

const buttonClosePhotoPopup = popupFormPhoto.querySelector('.popup__close');


const elementTemplate = document.querySelector('#template-element').content;
const elementsGrid = document.querySelector('.elements__grid');

const inputFormEdit = popupFormEdit.querySelector('.popup__form-edit');
const inputFormAdd = popupFormAdd.querySelector('.popup__form-add');

function openPopupEdit() {
	openPopup (popupFormEdit);
	inputName.value = profileName.textContent;
	inputHobby.value = profileHobby.textContent;
}

function openPopupAdd() {
	document.querySelector('.popup__form-add').reset();
	saveButton.setAttribute('disabled', 'disabled');
	openPopup (popupFormAdd);
}

function handleEditFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileHobby.textContent = inputHobby.value;
    closePopup(popupFormEdit);
}

function createNewCard (item) {
	const card = new Card (item, '#template-element');
	return card.createCard();
}

function handleAddFormSubmit (evt) {
	evt.preventDefault();
	const cardData = {
    	name: inputText.value,
    	link: inputPhoto.value
  	}
  	elementsGrid.prepend(createNewCard(cardData));
  	closePopup(popupFormAdd);
}

function addInitialCards() {
  	initialCards.forEach((item) => {
  		elementsGrid.append(createNewCard(item));
	});
}

const inputFormEditValidator = new FormValidator(configs, inputFormEdit);
const inputFormAddValidator = new FormValidator(configs, inputFormAdd);

inputFormEditValidator.enableValidation()
inputFormAddValidator.enableValidation()

buttonAdd.addEventListener('click', openPopupAdd);
buttonCloseAddProfilePopup.addEventListener('click', () => 
closePopup(popupFormAdd));
inputFormAdd.addEventListener('submit', handleAddFormSubmit);

buttonEdit.addEventListener('click', openPopupEdit);
buttonCloseEditProfilePopup.addEventListener('click', () => 
closePopup(popupFormEdit));
inputFormEdit.addEventListener('submit', handleEditFormSubmit);

buttonClosePhotoPopup.addEventListener('click', () => 
closePopup(popupFormPhoto));

addInitialCards();