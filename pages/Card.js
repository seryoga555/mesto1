import {popupImage} from './index.js'; // импорт перемнной попапа
import {openAnyPopup} from './index.js' // импорт функции для открытия попапа

export class Card {
  constructor(data, selector) {
    this._selector = selector;
    this._link = data.link;
    this._name = data.name;
    this._element = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    this._image = this._element.querySelector('.element__image');
  }

  _showCardImage(evt) { // просмотр картинки в попапе
    document.querySelector('.popup__image').src = evt.target.src; // add url image
    document.querySelector('.popup__text').textContent = evt.target.alt; // add title
    openAnyPopup(popupImage);
  }
  
  _toggleLike(evt) { // функция отметки лайка 
    evt.target.classList.toggle('element__like_active')
  }

  _cardDelete(evt) {  // Функция удаления карточки 
    evt.target.closest('.element').remove()
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