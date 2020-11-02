import {popupImage, image, imageText} from './constants.js'; // импорт перемнной попапа
import {openAnyPopup} from './utils.js' // импорт функции для открытия попапа

export class Card {
  constructor(data, selector) {
    this._selector = selector;
    this._link = data.link;
    this._name = data.name;
    this._element = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    this._image = this._element.querySelector('.element__image');
    this._like = this._element.querySelector('.element__like');
  }

  _showCardImage(evt) { // просмотр картинки в попапе
    image.src = evt.target.src;
    imageText.textContent = evt.target.alt;
    openAnyPopup(popupImage);
  }
  
  _toggleLike() { // функция отметки лайка
    this._like.classList.toggle('element__like_active')
  }

  _cardDelete() {  // Функция удаления карточки 
    this._element.remove()
    this._element = null
  }

  _cardClickHandler(evt) { // обработчик кликов на  картинку, лайк  и удаление
    if (evt.target.classList.contains('element__like')) {
      this._toggleLike(evt);
    }
    if (evt.target.classList.contains('element__image')) {
      this._showCardImage(evt);
    }
    if (evt.target.classList.contains('element__trash')){
      this._cardDelete(evt);
    }
  }

  _setCardEventListeners(){ // установить слушатель на карточку 
    this._element.addEventListener('click', (evt) => this._cardClickHandler(evt))
  }

  generateCard() { // наполняем карточку
    this._setCardEventListeners();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element
  }
}