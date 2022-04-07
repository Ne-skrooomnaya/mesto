export const popupFormPhoto = document.querySelector('.popup-photo');

export function removeInputError (formName) {
	formName.querySelectorAll('.popup__error').forEach((inputElement) => {
		inputElement.classList.remove('.popup__error');
    	inputElement.textContent = '';
	});
}

export function removeMessageError (formName) {
	formName.querySelectorAll('.popup__input_error').forEach((inputElement) => {
		inputElement.classList.remove('popup__input_error');
	});
}

export const closeMausOverlay = (evt) => {
	const item = document.querySelector('.popup_opened');
	if(evt.target === item) {
		closePopup(item);
	}
}

export const closeKeybordEscape = (evt) => {
  	if(evt.key === 'Escape') {
		const item = document.querySelector('.popup_opened');
    	closePopup(item);
	}
}

export function closePopup(formName) {
	formName.classList.remove('popup_opened');
	document.removeEventListener('mousedown', closeMausOverlay);
	document.removeEventListener('keydown', closeKeybordEscape);
	removeInputError(formName);
	removeMessageError(formName);
}

export function openPopup(formName) {
	formName.classList.add('popup_opened');
	document.addEventListener('mousedown', closeMausOverlay);
	document.addEventListener('keydown', closeKeybordEscape);
}