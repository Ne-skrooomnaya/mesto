import { configs } from "../utils/config";

export class FormValidator {
  constructor(configs, form) {
    this._inputSelector = configs.inputSelector;
    this._submitButtonSelector = configs.submitButtonSelector;
    this._inputErrorClass = configs.inputErrorClass;
    this._errorClass = configs.errorClass;
  
    this._form = form;
    this._configs = configs;


    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);

    errorElement.textContent = errorMessage;
  };
    
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);

    errorElement.textContent = '';
  };
    
  _hasInvalidInput () {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }; 

  _setEventListeners () {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }; 

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {  
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState () {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.removeAttribute('disabled');
    };
  }

  enableValidation () {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });     
    this._setEventListeners();
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  };

}

export default FormValidator;