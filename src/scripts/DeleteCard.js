import Popup from './Popup.js';

export  default class DeleteCard extends Popup {
    constructor(popup, handleSubmitForm) {
        super(popup);
        this._handleSubmitForm = handleSubmitForm;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._button = this._popup.querySelector('.popup__save');
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
          this._inputValues[input.name] = input.value;
        });
    
        return this._inputValues;
      }
    
    //   close() {
    //     this._formElement.reset();
    //     super.close();
    //   }
    
      changeSubmitHandler(newSubmitHandler) {
        this._handleSubmitForm = newSubmitHandler;
      }
    
      setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleSubmitForm(this._getInputValues())
        });
      }
    
    //   setLoadingMessage(isLoading) {
    //     if (isLoading === true) {
    //       this._button.textContent = 'Сохранение...';
    //     } else {
    //       this._button.textContent = 'Сохранить';
    //     }
    //   }
}