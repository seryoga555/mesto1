import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const popup = document.querySelector('.popup'); //сам блок попап редактирования профиля
const editButton = document.querySelector('.profile__edit-button'); //копка редактирования профиля
const closeButton = document.querySelector('.popup__close-button'); //кнопка закрытия редактирования профиля
const formElement = document.querySelector('.popup__content'); //форма редактирования профиля
const nameInput = formElement.querySelector('.popup__form_input_name'); //вводимое в форму имя, для профиля
const jobInput = formElement.querySelector('.popup__form_input_job'); //вводимое в форму занятие, для профиля
const profilename = document.querySelector('.profile__name'); //имя отображаемое в профиле
const profilejob = document.querySelector('.profile__job'); //занятие отображаемое в профиле
const elements = document.querySelector('.elements'); //блок сайта для добавление карточек
const addButton = document.querySelector('.profile__add-button'); //кнопка добавить картинку, которая в профиле
const popupCard = document.querySelector('.popup_card'); //сам блок добавления карточки, попап
const cardFormElement = document.querySelector('#popupFormCard'); //форма добавление карточки, попап
const cardCloseButton = document.querySelector('#popupCardCloseButton'); //кнопка закрытия попапа добавления карточки
const cardName = cardFormElement.querySelector('#formCardName'); //вводимое в форму название картинки, для добавления карточки
const cardUrl = cardFormElement.querySelector('#formCardUrl'); //вводимый в форму URL картинки, для добавления карточки
export const popupImage = document.querySelector('.popup_image'); //сам блок попап с почти фулл-скрин картинкой
const popupImageClose = document.querySelector('#popupImageCloseButton'); //кнопка выхода из просмотра картинки
const popups = Array.from(document.querySelectorAll('.popup')); //массив попапов
const forms = Array.from(document.querySelectorAll('.popup__content')); // массив форм

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

export function openAnyPopup(elem) {  // функция открытия попапов
  addPopupCloseListener(elem);
  clearErrors(elem);
  elem.classList.add('popup_opened');
  cardFormElement.reset();
}

function addPopupCloseListener (elem) { // функция добавления слушателей на попап
  document.addEventListener('keydown', escapeСlose);
}

function escapeСlose (evt) { // Функция закрытия по эскейп метод find
if (evt.key === 'Escape') {
  const popup = popups.find(function (popup) {
    return popup.classList.contains('popup_opened');
  });
  closePopup(popup);
 }
}

export function closePopup (elem) { // Функция закрытия попапов
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeСlose); 
}

export function clearErrors(element) { // Функция удаления ошибок для попапов
  if (element === popupImage) {
    return 
  }
  const inputlist = element.querySelectorAll('.popup__form');
  const spanlist = element.querySelectorAll('.popup__error');
  const button = element.querySelector('.popup__button');
  inputlist.forEach((input) => input.classList.remove('popup__form_error'));
  spanlist.forEach((span) => {
    span.classList.remove('popup__error_visible');
    span.textContent = '';
  });
  button.disabled = true;
  button.classList.add('popup__button_disabled');

  if (element === popup) {
    button.disabled = false;
    button.classList.remove('popup__button_disabled');
  }
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

function startFormValidation() { // Функция находящая формы и запускающая валидацию
  forms.forEach((form) => {
    const originalValid = new FormValidator({
     formSelector: '.popup__content',
     inputSelector: '.popup__form',
     submitButtonSelector: '.popup__button',
     inactiveButtonClass: 'popup__button_disabled',
     inputErrorClass: 'popup__form_error',
     errorClass: 'popup__error_visible'
     }, form)

     originalValid.enableValidation()
  })
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
  popupCard.querySelector('.popup__content').reset()
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
  clearErrors(popup);
  openAnyPopup(popup);
  nameInput.value = profilename.textContent;
  jobInput.value = profilejob.textContent;
});

closeButton.addEventListener('click', () => closePopup(popup)); // ловим клик по кнопке закрытия попапа и закрываем его функцией

cardFormElement.addEventListener('submit', addNewCard); // навешиваем слушатель события сабмит на форму добавения карточки

addButton.addEventListener('click', () => { // Слушатель клика для кнопки добавить карточку в профиле пользователя
  clearErrors(popupCard);
  openAnyPopup(popupCard);
});

cardCloseButton.addEventListener('click', () => closePopup(popupCard)); // Слушатель клика для кнопки закрытия попапа редактирования карточки

popupImageClose.addEventListener('click', () => closePopup(popupImage)); // Слушатель клика для закрытия попапа с картинкой по кнопке закрыть

render ();

startFormValidation();