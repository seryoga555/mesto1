import { Card } from './Card.js' // импорт класса создания карточки
import { FormValidator } from './FormValidator.js' // импорт класса валидации
import { openAnyPopup } from './utils.js' //импорт функции открытия попапов
import { popup, editButton, closeButton, formElement, nameInput, jobInput, profilename, profilejob, elements, 
addButton, popupCard, cardFormElement, cardCloseButton, cardName, cardUrl, popupImage, popupImageClose } from './constants.js' // константы

const initialCards = [ //карточки из коробочки
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export function addPopupCloseListener (elem) { // функция добавления слушателей на попап
  document.addEventListener('keydown', escapeСlose);
}

function escapeСlose (evt) { // Функция закрытия по эскейп метод find
if (evt.key === 'Escape') {
  const openedPopup = document.querySelector('.popup_opened')
  closePopup(openedPopup);
 }
}

export function closePopup (elem) { // Функция закрытия попапов
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeСlose); 
}

function render () { // функция закрузки первых 6 карточке нашего массива
  initialCards.forEach(({link, name}) => {	
     const cardsArray = new Card({link, name}, '#template');	
     elements.append(cardsArray.generateCard()); 	
  });	
}    

const closeByOverlay = (evt, popup) => { // Фунцкия закрытия по оверлэй
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  }
}

const originalValidProfile = new FormValidator({
  formSelector: '.popup__content',
  inputSelector: '.popup__form',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__form_error',
  errorClass: 'popup__error_visible'
  }, formElement)

const originalValidCard = new FormValidator({
  formSelector: '.popup__content',
  inputSelector: '.popup__form',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__form_error',
  errorClass: 'popup__error_visible'
  }, cardFormElement)

function startFormValidation() { // Функция находящая формы и запускающая валидацию
  originalValidProfile.enableValidation()  
  originalValidCard.enableValidation()
}

function formSubmitHandler(evt) { // Обработчик  формы редактирования профиля
  evt.preventDefault();
  profilename.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;
  closePopup(popup);
}

function addNewCard(evt) { // Функция создания добавления нового объекта в массив из формы добавления новой карточки
  evt.preventDefault();
  const obj = {};
  obj.link = cardUrl.value
  obj.name = cardName.value
  const originalCard = new Card(obj, '#template')
  elements.prepend(originalCard.generateCard())
  closePopup(popupCard);
}

// устанавливаем слушатели и вызываем нужные функции

popup.addEventListener ('click', function (evt) { // закрыть основной попап по оверлей
  closeByOverlay(evt, popup )
})
popupCard.addEventListener ('click', function (evt) { // закрыть  попап с карточкой  по оверлей
  closeByOverlay(evt, popupCard )
})
popupImage.addEventListener ('click', function (evt) { // закрыть  попап с картинкой  по оверлей
  closeByOverlay(evt, popupImage )
})

formElement.addEventListener('submit', formSubmitHandler); // слушатель события сабмит в форме редактирования профиля

editButton.addEventListener('click', () => { // ловим клик по кнопке редактирования и открываем popup
  originalValidProfile.clearErrors()
  originalValidCard.clearErrors()
  openAnyPopup(popup);
  nameInput.value = profilename.textContent;
  jobInput.value = profilejob.textContent;
});

closeButton.addEventListener('click', () => closePopup(popup)); // ловим клик по кнопке закрытия попапа и закрываем его функцией

cardFormElement.addEventListener('submit', addNewCard); // навешиваем слушатель события сабмит на форму добавения карточки

addButton.addEventListener('click', () => { // Слушатель клика для кнопки добавить карточку в профиле пользователя
  originalValidProfile.clearErrors()
  originalValidCard.clearErrors()
  openAnyPopup(popupCard);
  cardFormElement.reset();
});

cardCloseButton.addEventListener('click', () => closePopup(popupCard)); // Слушатель клика для кнопки закрытия попапа редактирования карточки

popupImageClose.addEventListener('click', () => closePopup(popupImage)); // Слушатель клика для закрытия попапа с картинкой по кнопке закрыть

render ();

startFormValidation();