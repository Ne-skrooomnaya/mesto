export default class Popup {
    constructor(popupSelector) {
      this._popupSelector = document.querySelector(popupSelector);
    }
  
    _handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    }
  
    _closeMausOverlay = (evt) => {
      if(evt.target.classList.contains('.popup')) {
        this.close();
      };
    }
  
    open() {
      this._popupSelector.classList.add('popup_opened');
      document.addEventListener("keydown", this._handleEscClose);
      window.addEventListener("mousedown", this._closeMausOverlay);
    }
  
    close() {
      this._popupSelector.classList.remove('popup_opened');
      document.removeEventListener("keydown", this._handleEscClose);
      window.addEventListener("mousedown", this._closeMausOverlay);
    }
  
    
  
    setEventListeners() {
      this._popupSelector
        .querySelector('.popup__close')
        .addEventListener("click", () => {
          this.close();
        });
    }
  }

