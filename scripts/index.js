const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');

const popupFormEdit = document.querySelector('.popup-edit');
const closeButtonEdit = popupFormEdit.querySelector('.popup__close-edit');
const inputFormEdit = popupFormEdit.querySelector('.popup__form-edit');
const inputName = popupFormEdit.querySelector('#popup__name');
const inputHobby = popupFormEdit.querySelector('#popup__hobby');

const addButton = document.querySelector(".profile__add-button");
const popupFormAdd = document.querySelector('.popup-add');
const closeButtonAdd = popupFormAdd.querySelector('.popup__close-add');
const inputFormAdd = popupFormAdd.querySelector('.popup__form-add');
const inputText = popupFormAdd.querySelector('#popup__text');
const inputPhoto = popupFormAdd.querySelector('#popup__photo');
const saveButton = popupFormAdd.querySelector('.popup__save');

const popupFormPhoto = document.querySelector('.popup-photo');
const closeButtonPhoto = popupFormPhoto.querySelector('.popup__close');

const elementTemplate = document.querySelector('#template-element').content;
const elementsGrid = document.querySelector('.elements__grid');

const closeMausOverlay = (evt) => {
	const item = document.querySelector('.popup_opened');
	if(evt.target === item) {
		closePopup(item);
	}
}

const closeKeybordEscape = (evt) => {
	const item = document.querySelector('.popup_opened');
	if(evt.key === 'Escape') {
		closePopup(item);
	}
}


function openPopup(formName) {
  formName.classList.add('popup_opened');

	document.addEventListener('mousedown', closeMausOverlay);
  document.addEventListener('keydown', closeKeybordEscape);
}

function closePopup(formName) {
  formName.classList.remove('popup_opened');
  
	document.removeEventListener('mousedown', closeMausOverlay);
  document.removeEventListener('keydown', closeKeybordEscape);
}

function openPopupEdit() {
  openPopup (popupFormEdit);
  inputName.value = profileName.textContent;
  inputHobby.value = profileHobby.textContent;
}

function openPopupAdd() {
  openPopup (popupFormAdd)
  inputText.value = '';
  inputPhoto.value = '';
  saveButton.classList.add('popup__save_inactive');
  saveButton.setAttribute('disabled', 'disabled');
}

function formSubmitHandlerEdit (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileHobby.textContent = inputHobby.value;
    closePopup(popupFormEdit);
}

function likeCard (likeElement) {
  likeElement.querySelector('.element__like').addEventListener('click', function(evt) {
  evt.target.classList.toggle('element__like_active');
  });
}

function deleteCard (delElement) {
  delElement.querySelector('.element__delete').addEventListener('click', function(evt) {
  evt.target.closest('.element').remove();
  });
}

function popupPhoto (popupElement) {
  popupElement.querySelector('.element__image').addEventListener('click', function() {
  popupFormPhoto.querySelector('.popup__image').src = popupElement.querySelector('.element__image').src;
  popupFormPhoto.querySelector('.popup__photo-text').textContent = popupElement.querySelector('.element__title').textContent;
  openPopup (popupFormPhoto);
  });
}

function createCard (name, link) {
  const userElement = elementTemplate.querySelector('.element').cloneNode(true);
  userElement.querySelector('.element__image').src = link;
  userElement.querySelector('.element__image').alt = name;
  userElement.querySelector('.element__title').textContent = name;
  likeCard (userElement);
  deleteCard (userElement);
  popupPhoto (userElement);
  return userElement;
}

function formSubmitHandlerAdd (evt) {
  evt.preventDefault();
  const name = inputText.value;
  const link = inputPhoto.value;
  const newCard = createCard (name, link);
  elementsGrid.prepend(newCard);
  closePopup(popupFormAdd);
}

function addInitialCards() {
  initialCards.forEach(function(item){
  const newCard = createCard (item.name, item.link);
  elementsGrid.append(newCard);
  });
}

addButton.addEventListener('click', openPopupAdd);
closeButtonAdd.addEventListener('click', () => closePopup(popupFormAdd));
inputFormAdd.addEventListener('submit', formSubmitHandlerAdd);

editButton.addEventListener('click', openPopupEdit);
closeButtonEdit.addEventListener('click', () => closePopup(popupFormEdit));
inputFormEdit.addEventListener('submit', formSubmitHandlerEdit);

closeButtonPhoto.addEventListener('click', () => closePopup(popupFormPhoto));

addInitialCards();

