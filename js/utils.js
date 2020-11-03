
export function openAnyPopup(elem) {  // функция открытия попапов
  addPopupCloseListener(elem);
  elem.classList.add('popup_opened');
}

export function addPopupCloseListener (elem) { // функция добавления слушателей на попап
  document.addEventListener('keydown', escapeСlose);
}

export function escapeСlose (evt) { // Функция закрытия по эскейп метод find
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
   }
  }

export function closePopup (elem) { // Функция закрытия попапов
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeСlose); 
}
