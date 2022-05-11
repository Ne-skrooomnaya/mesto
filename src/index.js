import './pages/index.css';

import { initialCards, configs } from './utils/config.js';
import Card from './scripts/Card.js';
import {popupFormPhoto} from './scripts/utils.js';
import FormValidator from './scripts/FormValidator.js';
import Section from './scripts/Section.js';
import UserInfo from './scripts/userInfo.js';
import PopupWithForm from './scripts/popupWithForm.js';
import PopupWithImage from './scripts/popupWithImage.js';

// // теперь картинки можно импортировать,
// // вебпак добавит в переменные правильные пути
// const karachaevsk = new URL('./images/1karachaevsk.jpg', import.meta.url);
// const gora = new URL('./images/2gora.png', import.meta.url);
// const dombai = new URL('./images/3dombai.png', import.meta.url)
// const gori = new URL('./images/4gori.png', import.meta.url);
// const dombaii = new URL('./images/5dombai.png', import.meta.url);
// // const karachaevski = new URL('./images/6karachaevski.png', import.meta.url);
// // const karachaevsk = new URL('./images/1karachaevsk.jpg', import.meta.url);
// // const karachaevsk = new URL('./images/1karachaevsk.jpg', import.meta.url);


// const whoIsTheGoat = [
//   // меняем исходные пути на переменные
//   { name: '1karachaevsk', image: karachaevsk },
//   { name: '2gora', link: gora },
//   { name: '3dombai', link: dombai },
//   { name: '4gori', link: gori },
//   { name: '5dombai', link: dombaii },
// //   { name: '6karachaevski', link: karachaevski },
// //   { name: 'Kobe Bryant', link: bryantImage },
// //   { name: 'Kobe Bryant', link: bryantImage },
// ];

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



//card

const popupImage = new PopupWithImage('.popup__container_type_photo'); 


function createNewCard (item) {
	const card = new Card (item, '#template-element',
	{handleCardClick: () => popupImage.open(item.name, item.link)});
	const cardElement = card.generateCard();
	cardList.addItem(cardElement);
}

const cardList = new Section({
	items: initialCards, 
	renderer: (item) => createNewCard(item)
  	}, '.elements__grid');

cardList.renderItems();



//validation
const inputFormEditValidator = new FormValidator(configs, inputFormEdit);
const inputFormAddValidator = new FormValidator(configs, inputFormAdd);

inputFormEditValidator.enableValidation()
inputFormAddValidator.enableValidation()
//

//форма профайла
const userInfo = new UserInfo('.profile__name', '.profile__hobby');

const formProfile = new PopupWithForm('.popup__container_type_edit', 
{handleSubmitForm: () => {
	userInfo.setUserInfo(inputName.value, inputHobby.value);
	formProfile.close();
}});

buttonEdit.addEventListener('click', () => {
	formProfile.open();
	const user = userInfo.getUserInfo();
	inputName.value = user.userName;
	inputHobby.value = user.userDescription;
	inputFormEditValidator.resetValidation();
});

formProfile.setEventListeners();

//

//форма добавления карточки

const addImageCard = new PopupWithForm('.popup__container_type_add', 
{handleSubmitForm: () => {
	addCardList({name: inputText.value, link: inputPhoto.value});
	addImageCard.close();
}});

buttonAdd.addEventListener('click', () => {
	addImageCard.open();
	inputFormAddValidator.resetValidation();
});

addImageCard.setEventListeners();





// buttonClosePhotoPopup.addEventListener('click', () => 
// closePopup(popupFormPhoto));

// addInitialCards.addEventListener();

// function handleAddFormSubmit (evt) {
// 	evt.preventDefault();
// 	const cardData = {
//     	name: inputText.value,
//     	link: inputPhoto.value
//   	}
//   	elementsGrid.prepend(createNewCard(cardData));
//   	closePopup(popupFormAdd);
// }

// function addInitialCards() {
//   	initialCards.forEach((item) => {
//   		elementsGrid.append(createNewCard(item));
// 	});
// }







// function openPopupEdit() {
// 	openPopup (popupFormEdit);
// 	inputName.value = profileName.textContent;
// 	inputHobby.value = profileHobby.textContent;
// }

// function openPopupAdd() {
// 	document.querySelector('.popup__form-add').reset();
// 	saveButton.setAttribute('disabled', 'disabled');
// 	openPopup (popupFormAdd);
// }

// function handleEditFormSubmit (evt) {
//     evt.preventDefault();
//     profileName.textContent = inputName.value;
//     profileHobby.textContent = inputHobby.value;
//     closePopup(popupFormEdit);
// }