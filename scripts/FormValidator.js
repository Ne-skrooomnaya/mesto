export class FormValidator {
    constructor(settings, form) {
        this._form = form
        this._settings = settings

        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass
      
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


    
}

