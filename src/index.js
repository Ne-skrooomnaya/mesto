import './pages/index.css';

import { initialCards, configs } from './utils/config.js';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import Section from './scripts/Section.js';
import UserInfo from './scripts/UserInfo.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import Api from './scripts/Api';

const buttonAdd = document.querySelector(".profile__add-button");
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAvatar = document.querySelector('.profile__avatar-button');

const popupFormEdit = document.querySelector('.popup-edit');
const popupFormAdd = document.querySelector('.popup-add');
const popupAvatar = document.querySelector('.popup-avatar');

const inputName = popupFormEdit.querySelector('.popup__input_name');
const inputHobby = popupFormEdit.querySelector('.popup__input_hobby');
// const inputText = popupFormAdd.querySelector('#popup__text');
// const inputPhoto = popupFormAdd.querySelector('#popup__photo');

//API
export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
    headers: {
      authorization: '51a7fdde-511a-44ce-8154-06c3a7923b8e',
      'Content-Type': 'application/json'
    }
  });

// пользователь
const userInfo = new UserInfo({
	nameSelector: '.profile__name',
	descriptionSelector: '.profile__hobby',
	avatarSelector: '.avatar__image',
  })
let userId = null;
console.log(userInfo)
//card

const popupImage = new PopupWithImage('.popup-photo');
popupImage.setEventListeners();

const confirmPopup = new PopupWithForm('.popup-delete');
confirmPopup.setEventListeners();

// const createNewCard = function(item) {
// 	const card = new Card (item, '#template-element',
// 	{handleCardClick: () => popupImage.open(item.name, item.link)});
// 	const cardElement = card.createCard();
// 	cardList.addItem(cardElement);
// }


const createNewCard = (data) => {
	const card = new Card(
		data, 
		'#template-element',
		() => {
			popupImage.open(data.name, data.link)
		},
		(id) => {
			confirmPopup.open();
			confirmPopup.changeSubmitHandler(() => {
				api.deleteCard(id)
					.then( res => {
						card.handleDeleteCard(res.deleteCard);
						confirmPopup.close();
					})
					.catch((err) => {
						console.log(`${err}`)
					})
				}
			)
		},
		(id) => {
			if(card.isLiked()) {
				api.deleteLike(id)
					.then(res => {
						card.setLikes(res.likes)
					})
					.catch((err) => {
						console.log(`${err}`)
					})
			} else {
				api.addLike(id)
					.then(res => {
						card.setLikes(res.likes)
					})
					.catch((err) => {
						console.log(`${err}`)
					})
			}
		}
	);
	return card.createCard();
}

// const cardList = new Section({
// 	items: initialCards,
// 	renderer: (item) => createNewCard(item)
//   	}, '.elements__grid');

// cardList.renderItems();

const cardList = new Section({ renderer: (data) => {
	const card = createNewCard({
		name: data.name,
		link: data.link,
		likes: data.likes,
		id: data._id,
		userId: userId,
		ownerId: data.owner._id
	});
	cardList.addItem(card);}}, '.elements__grid');

//форма

// const addImageCard = new PopupWithForm('.popup-add',
// {handleSubmitForm: () => {
// 	createNewCard({name: inputText.value, link: inputPhoto.value});
// 	addImageCard.close();
// }});

// buttonAdd.addEventListener('click', () => {
// 	addImageCard.open();
// 	inputFormAddValidator.resetValidation();
// });

// addImageCard.setEventListeners();
const addImageCard = new PopupWithForm('.popup-add', 
	(item) => {
		addImageCard.setLoadingMessage(true);
		api.postNewCard(item)
			.then(res => {
				const card = createNewCard({
					name: res.name,
					link: res.link,
					likes: res.likes,
					id: res._id,
					userId: userId,
					ownerId: res.owner._id
				})
				cardList.prependItem(card);
				addImageCard.close();
			})
			.catch((err) => {
                console.log(`${err}`)
            })
			.finally(() => {
				addImageCard.setLoadingMessage(false);
				
			})
	}
);

addImageCard.setEventListeners();


buttonAdd.addEventListener('click', () => {
	addImageCard.open();
	inputFormAddValidator.resetValidation();
});

//validation
const inputFormEditValidator = new FormValidator(configs, popupFormEdit);
const inputFormAddValidator = new FormValidator(configs, popupFormAdd);
const inputFormAvatarValidator = new FormValidator(configs, popupAvatar);

inputFormEditValidator.enableValidation()
inputFormAddValidator.enableValidation()
inputFormAvatarValidator.enableValidation()

//форма
// const formProfile = new PopupWithForm('.popup-edit',
// {handleSubmitForm: () => {
// 	userInfo.setUserInfo(inputName.value, inputHobby.value);
// 	formProfile.close();
// }});
const formProfile = new PopupWithForm('.popup-edit', 
	(item) => {
		
		formProfile.setLoadingMessage(true);
		api.patchUserInfo(item)
			.then(res => {
				userInfo.setUserInfo(res.name, res.about);
				formProfile.close();
			})
			.catch((err) => {
                console.log(`${err}`)
            })
			.finally(() => {
				formProfile.setLoadingMessage(false);
				
			})
	}
);

formProfile.setEventListeners();


buttonEdit.addEventListener('click', () => {
	const user = userInfo.getUserInfo();
	formProfile.open();
	inputName.value = user.userName;
	inputHobby.value = user.userDescription;
	inputFormEditValidator.resetValidation();
});

// buttonEditInfo.addEventListener('click', () => {
// 	const userData = userInfo.getUserInfo();
// 	nameInput.value = userData.userName;
// 	jobInput.value = userData.userJob;
// 	validateFormEdit.toggleButtonState();
// 	formProfile.open();
//   });

//форма аватарки
const formAvatar = new PopupWithForm('.popup-avatar',
 	(item) => {
		formAvatar.setLoadingMessage(true);
		api.patchUserAvatar(item)
			.then(res => {
				userInfo.setUserAvatar(res.avatar);
				formAvatar.close();
			})
			.catch((err) => {
                console.log(`${err}`)
            })
			.finally(() => {
				formAvatar.setLoadingMessage(false);
				
			})
	}
);

formAvatar.setEventListeners();

buttonAvatar.addEventListener('click', () => {
	formAvatar.open();
	inputFormAvatarValidator.resetValidation();
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, user]) => {
	userInfo.setUserInfo(user.name, user.about);
	console.log(user.name);
	console.log(user.about);
	userInfo.setUserAvatar(user.avatar);
	console.log(user.avatar);
	userId = user._id;
	cardList.renderItems(cards)
	
	})
  .catch(err => {
    console.log(`${err}`);
});

