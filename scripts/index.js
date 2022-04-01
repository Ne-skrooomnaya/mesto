import { initialCards, configs } from './config.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');

const popupFormEdit = document.querySelector('.popup-edit');
const closeButtonEdit = popupFormEdit.querySelector('.popup__close-edit');

const inputName = popupFormEdit.querySelector('#popup__name');
const inputHobby = popupFormEdit.querySelector('#popup__hobby');

const buttonAdd = document.querySelector(".profile__add-button");
const popupFormAdd = document.querySelector('.popup-add');
const closeButtonAdd = popupFormAdd.querySelector('.popup__close-add');

const inputText = popupFormAdd.querySelector('#popup__text');
const inputPhoto = popupFormAdd.querySelector('#popup__photo');
const saveButton = popupFormAdd.querySelector('.popup__save');

export const popupFormPhoto = document.querySelector('.popup-photo');
const closeButtonPhoto = popupFormPhoto.querySelector('.popup__close');


const elementTemplate = document.querySelector('#template-element').content;
const elementsGrid = document.querySelector('.elements__grid');

const inputFormEdit = popupFormEdit.querySelector('.popup__form-edit');
const inputFormAdd = popupFormAdd.querySelector('.popup__form-add');



function removeInputError (formName) {
	formName.querySelectorAll('.popup__error').forEach((inputElement) => {
		inputElement.classList.remove('.popup__error');
    	inputElement.textContent = '';
	});
}

function removeMessageError (formName) {
	formName.querySelectorAll('.popup__input_error').forEach((inputElement) => {
		inputElement.classList.remove('popup__input_error');
	});
}

const closeMausOverlay = (evt) => {
	const item = document.querySelector('.popup_opened');
	if(evt.target === item) {
		closePopup(item);
	}
}

const closeKeybordEscape = (evt) => {
  if(evt.key === 'Escape') {
		const item = document.querySelector('.popup_opened');
    closePopup(item);
	}
}

export function openPopup(formName) {
  formName.classList.add('popup_opened');
	document.addEventListener('mousedown', closeMausOverlay);
  document.addEventListener('keydown', closeKeybordEscape);
}

function closePopup(formName) {
  formName.classList.remove('popup_opened');
	document.removeEventListener('mousedown', closeMausOverlay);
  document.removeEventListener('keydown', closeKeybordEscape);
	removeInputError(formName);
	removeMessageError(formName);
}

function openPopupEdit() {
	openPopup (popupFormEdit);
	inputName.value = profileName.textContent;
	inputHobby.value = profileHobby.textContent;
	
}

function openPopupAdd() {
	openPopup (popupFormAdd);
	document.getElementById('form-add').reset();
	saveButton.setAttribute('disabled', 'disabled');
}

function handleEditFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileHobby.textContent = inputHobby.value;
    closePopup(popupFormEdit);
}

function newCard (item) {
	const card = new Card (item, '#template-element');
	return card.createCard();
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const CardData = {
    _name: inputText.value,
    _link: inputPhoto.value
  }
  elementsGrid.prepend(newCard(CardData));
  closePopup(popupFormAdd);
}

function addInitialCards() {
  initialCards.forEach((item) => {
  elementsGrid.append(newCard(item));
  });
}

const inputFormEditValidator = new FormValidator(configs, inputFormEdit);
const inputFormAddValidator = new FormValidator(configs, inputFormAdd);

inputFormEditValidator.enableValidation()
inputFormAddValidator.enableValidation()

buttonAdd.addEventListener('click', openPopupAdd);
closeButtonAdd.addEventListener('click', () => 
closePopup(popupFormAdd));
inputFormAdd.addEventListener('submit', handleAddFormSubmit);

buttonEdit.addEventListener('click', openPopupEdit);
closeButtonEdit.addEventListener('click', () => 
closePopup(popupFormEdit));
inputFormEdit.addEventListener('submit', handleEditFormSubmit);

closeButtonPhoto.addEventListener('click', () => 
closePopup(popupFormPhoto));

addInitialCards();

