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


