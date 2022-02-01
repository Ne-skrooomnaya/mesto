const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const popupFormEdit = document.querySelector('.popup-edit');
const closeButtonEdit = document.querySelector('.popup__close-edit');
const inputFormEdit = document.querySelector('.popup__form-edit');
const inputName = document.querySelector('#popup__name');
const inputHobby = document.querySelector('#popup__hobby');

const addButton = document.querySelector(".profile__add-button");
const popupFormAdd = document.querySelector('.popup-add');
const closeButtonAdd = document.querySelector('.popup__close-add');
const inputFormAdd = document.querySelector('.popup__form-add');
const inputText = document.querySelector('#popup__text');
const inputPhoto = document.querySelector('#popup__photo');

const popupFormPhoto = document.querySelector('.popup-photo');
const closeButtonPhoto = popupFormPhoto.querySelector('.popup__close');

const elementTemplate = document.querySelector('#template-element').content;
const elementsGrid = document.querySelector('.elements__grid');


function openPopup(formName) {
  formName.classList.add('popup_opened');
}

function closePopup(formName) {
  formName.classList.remove('popup_opened');
}

function openPopupAdd() {
  openPopup (popupFormAdd)
  inputText.value = '';
  inputPhoto.value = '';
}

function openPopupEdit() {
  openPopup (popupFormEdit);
  inputName.value = profileName.textContent;
  inputHobby.value = profileHobby.textContent;
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
  const eventTarget = evt.target;
  const listItem = eventTarget.closest('.element');
  listItem.remove();
  });
}

function popupPhoto (popupElement) {
  popupElement.querySelector('.element__image').addEventListener('click', function() {
  const image = popupFormPhoto.querySelector('.popup__image');
  image.src = popupElement.querySelector('.element__image').src;
  image.alt = popupElement.querySelector('.element__image').alt;
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

function constructorCard() {
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

constructorCard();