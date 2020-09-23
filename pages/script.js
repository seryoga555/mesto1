let popup = document.querySelector('.popup'); //сам блок попап редактирования профиля
let editButton = document.querySelector('.profile__edit-button'); //копка редактирования профиля
let closeButton = document.querySelector('.popup__close-button'); //кнопка закрытия редактирования профиля
let formElement = document.querySelector('.popup__content'); //форма редактирования профиля
let nameInput = formElement.querySelector('.popup__form_input_name'); //вводимое в форму имя, для профиля
let jobInput = formElement.querySelector('.popup__form_input_job'); //вводимое в форму занятие, для профиля
let profilename = document.querySelector('.profile__name'); //имя отображаемое в профиле
let profilejob = document.querySelector('.profile__job'); //занятие отображаемое в профиле
let elements = document.querySelector('.elements'); //блок сайта для добавление карточек
let addButton = document.querySelector('.profile__add-button'); //кнопка добавить картинку, которая в профиле
let popupCard = document.querySelector('.popup_card'); //сам блок добавления карточки, попап
let cardFormElement = document.querySelector('#popupFormCard'); //форма добавление карточки, попап
let cardCloseButton = document.querySelector('#popupCardCloseButton'); //кнопка закрытия попапа добавления карточки
let cardName = document.querySelector('#formCardName'); //вводимое в форму название картинки, для добавления карточки
let cardUrl = document.querySelector('#formCardUrl'); //вводимый в форму URL картинки, для добавления карточки
let cardCreate = document.querySelector('#cardCreateButton'); //кнопка создания карточки
let popupImage = document.querySelector('.popup_image'); //сам блок попап с почти фулл-скрин картинкой
let popupImageClose = document.querySelector('#popupImageCloseButton'); //кнопка выхода из просмотра картинки

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

function togglePopup(elem) {  //функция включения выключения попапов
  elem.classList.toggle('popup_opened');
  jobInput.value = profilejob.textContent;
  nameInput.value = profilename.textContent;
};

function formSubmitHandler (evt) {  //функция отправки формы профиля
    evt.preventDefault();
    profilename.textContent = nameInput.value;
    profilejob.textContent = jobInput.value;
    togglePopup(popup);
};

function addElement(link, name) { //функция клонирования карточки из шаблона и наполнения её элементами
  let template = document.querySelector('#template').content;
  let elementsItem = template.cloneNode(true);
  let cardDelete = elementsItem.querySelector('.element__trash');
  let cardLike = elementsItem.querySelector('.element__like');
  let cardImg = elementsItem.querySelector('.element__image');
  let cardTitle = elementsItem.querySelector('.element__title');
  cardImg.src = link;
  cardImg.alt = name;
  cardTitle.textContent = name;

  cardLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });

  cardDelete.addEventListener('click', function(evt) {
    evt.target.parentElement.remove();
  });

  cardImg.addEventListener('click', function () {
    togglePopup(popupImage);
    popupImage.querySelector('.popup__image').src = link;
    popupImage.querySelector('.popup__text').textContent = name;
  });
  return elementsItem;
};

function userAddElement(evt) { //функция создания карточки
  evt.preventDefault();
  elements.prepend(addElement(cardUrl.value, cardName.value));
  togglePopup(popupCard);
};

function initialCardsLoad () { //загрузка дефолтных карточек из коробочки
  initialCards.forEach(({link, name}) => elements.append(addElement(link, name)));
};

function openClearField () { //чистые поля при открытии формы создания карточки
  cardName.value = '';
  cardUrl.value = '';
};

//триггеры выполнения функций
editButton.addEventListener('click', () => togglePopup(popup));
closeButton.addEventListener('click', () => togglePopup(popup));
formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', () => togglePopup(popupCard));
cardCloseButton.addEventListener('click', () => togglePopup(popupCard));
cardFormElement.addEventListener('submit', userAddElement);
popupImageClose.addEventListener('click', () => togglePopup(popupImage));
addButton.addEventListener('click', openClearField);
initialCardsLoad();