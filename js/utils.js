import {addPopupCloseListener} from './index.js'
export function openAnyPopup(elem) {  // функция открытия попапов
  addPopupCloseListener(elem);
  elem.classList.add('popup_opened');
}
