const configs = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_activ'
}

const showInputError = (formElement, inputElement, errorMessage, configs) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configs.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configs.errorClass)
};

const hideInputError = (formElement, inputElement, configs) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configs.inputErrorClass);
  errorElement.classList.remove(configs.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, configs) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, configs);
  } else {
      hideInputError(formElement, inputElement, configs);
  }
};

const setEventListeners = (formElement, configs) => {
  const inputList = Array.from(formElement.querySelectorAll(configs.inputSelector));
  const buttonElement = formElement.querySelector(configs.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', () => {
      toggleButtonState(inputList, buttonElement, configs);
     checkInputValidity(formElement, inputElement, configs);
     
   });
 });
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}; 
function disable(buttonElement, configs){
  buttonElement.classList.add(configs.inactiveButtonClass);
     buttonElement.setAttribute('disabled', 'disabled');
}
const toggleButtonState = (inputList, buttonElement, configs) => {
  if (hasInvalidInput(inputList)) {
      disable(buttonElement, configs);
  } else {
     buttonElement.classList.remove(configs.inactiveButtonClass);
     buttonElement.removeAttribute('disabled');
  }
}; 

const enableValidation = (configs) => {
  const formList = Array.from(document.querySelectorAll(configs.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
       evt.preventDefault();
    });
    
    setEventListeners(formElement, configs);
  });
}

enableValidation(configs); 