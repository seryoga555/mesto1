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
const popupImage = document.querySelector('.popup_image'); //сам блок попап с почти фулл-скрин картинкой
const popupImageClose = document.querySelector('#popupImageCloseButton'); //кнопка выхода из просмотра картинки
const template = document.querySelector('#template').content; //шаблон карточки
const popups = Array.from(document.querySelectorAll('.popup')); //массив попапов

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

function open(elem) { //функция открытия попапов
  addPopupCloseListener(elem);
  clearErrors(elem);
  elem.classList.add('popup_opened');
  cardFormElement.reset();
};

function addPopupCloseListener(elem) { //добавление слушателей на попап
  document.addEventListener('keyup', escapeClose);
  elem.addEventListener('click', popupEventHandler);
} 

function closePops(elem) { //функция закрытия попапов
  elem.classList.remove('popup_opened');
  document.removeEventListener('keyup', escapeClose);
  elem.removeEventListener('click' , popupEventHandler);
};

function popupEventHandler (evt) { //функция закрытия по оверлею и крестику
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePops(evt.target)
    closePops(evt.target.closest('.popup'));
  }
};

function escapeClose (evt) { //функция закрытия по Esc
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePops(popup);
  }
};

function formSubmitHandler (evt) {  //функция отправки формы профиля
    evt.preventDefault();
    profilename.textContent = nameInput.value;
    profilejob.textContent = jobInput.value;
    closePops(popup);
};

function addElement(link, name) { //функция клонирования карточки из шаблона и наполнения её элементами
  
  const elementsItem = template.cloneNode(true);
  const cardDelete = elementsItem.querySelector('.element__trash');
  const cardLike = elementsItem.querySelector('.element__like');
  const cardImg = elementsItem.querySelector('.element__image');
  const cardTitle = elementsItem.querySelector('.element__title');
  cardImg.src = link;
  cardImg.alt = name;
  cardTitle.textContent = name;

  cardLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });

  cardDelete.addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });

  cardImg.addEventListener('click', function () {
    open(popupImage);
    popupImage.querySelector('.popup__image').src = link;
    popupImage.querySelector('.popup__text').textContent = name;
  });
  return elementsItem;
};

function userAddElement(evt) { //функция создания карточки
  evt.preventDefault();
  elements.prepend(addElement(cardUrl.value, cardName.value));
  cardFormElement.reset();
  closePops(popupCard);
};

function initialCardsLoad () { //загрузка дефолтных карточек из коробочки
  initialCards.forEach(({link, name}) => elements.append(addElement(link, name)));
};

//триггеры выполнения функций
editButton.addEventListener('click', () => {
  clearErrors(popup);
  open(popup); 
  jobInput.value = profilejob.textContent; 
  nameInput.value = profilename.textContent;
});
closeButton.addEventListener('click', () => closePops(popup));
formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', () => {
  clearErrors(popupCard);
  open(popupCard);
});
cardCloseButton.addEventListener('click', () => closePops(popupCard));
cardFormElement.addEventListener('submit', userAddElement);
popupImageClose.addEventListener('click', () => closePops(popupImage));
initialCardsLoad();
//все названия функций кроме closepops были в стиле lowerCamelCase, переделал closePops и хочу оставить все функции в lCC