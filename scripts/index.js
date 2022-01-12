
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileHobby = document.querySelector(".profile__hobby");
const popupForm = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const inputForm = document.querySelector('.popup__form');
const inputName = document.querySelector('#popup__name');
const inputHobby = document.querySelector('#popup__hobby');


function openPopup() {
    popupForm.classList.add('popup_opened');
    inputName.value = userName.textContent;
    inputHobby.value = userHobby.textContent;
}

function closePopup() {
    popupForm.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    userName.textContent = inputName.value;
    userHobby.textContent = inputHobby.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
inputForm.addEventListener('submit', formSubmitHandler);