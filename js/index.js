import { Card } from './Card.js' // импорт класса создания карточки
import { FormValidator } from './FormValidator.js' // импорт класса валидации
import { openAnyPopup, addPopupCloseListener, escapeСlose, closePopup} from './utils.js' //импорт функции открытия попапов
import { popupProfile, editButton, closeButton, profileFormElement, nameInput, jobInput, profilename, profilejob, elements, 
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

function render () { // функция закрузки первых 6 карточке нашего массива
  initialCards.forEach(({link, name}) => {	
     const cardsArray = new Card({link, name}, '#template');	
     elements.append(cardsArray.generateCard()); 	
  });	
}    

const closeByOverlay = (evt, popupProfile) => { // Фунцкия закрытия по оверлэй
  if (evt.target.classList.contains('popup')) {
    closePopup(popupProfile);
  }
}

const originalValid = {
  formSelector: '.popup__content',
  inputSelector: '.popup__form',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__form_error',
  errorClass: 'popup__error_visible'
}
const originalValidProfile = new FormValidator(originalValid, profileFormElement)
const originalValidCard = new FormValidator(originalValid, cardFormElement)

function startFormValidation() { 
  originalValidProfile.enableValidation()  
  originalValidCard.enableValidation()
}

function formSubmitHandler(evt) { // Обработчик  формы редактирования профиля
  evt.preventDefault();
  profilename.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;
  closePopup(popupProfile);
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

popupProfile.addEventListener ('click', function (evt) { // закрыть основной попап по оверлей
  closeByOverlay(evt, popupProfile )
})
popupCard.addEventListener ('click', function (evt) { // закрыть  попап с карточкой  по оверлей
  closeByOverlay(evt, popupCard )
})
popupImage.addEventListener ('click', function (evt) { // закрыть  попап с картинкой  по оверлей
  closeByOverlay(evt, popupImage )
})

profileFormElement.addEventListener('submit', formSubmitHandler); // слушатель события сабмит в форме редактирования профиля

editButton.addEventListener('click', () => { // ловим клик по кнопке редактирования и открываем попап
  originalValidProfile.clearErrors()
  openAnyPopup(popupProfile);
  nameInput.value = profilename.textContent;
  jobInput.value = profilejob.textContent;
});

closeButton.addEventListener('click', () => closePopup(popupProfile)); // ловим клик по кнопке закрытия попапа и закрываем его функцией

cardFormElement.addEventListener('submit', addNewCard); // навешиваем слушатель события сабмит на форму добавения карточки

addButton.addEventListener('click', () => { // Слушатель клика для кнопки добавить карточку в профиле пользователя
  originalValidCard.clearErrors()
  openAnyPopup(popupCard);
  cardFormElement.reset();
});

cardCloseButton.addEventListener('click', () => closePopup(popupCard)); // Слушатель клика для кнопки закрытия попапа редактирования карточки

popupImageClose.addEventListener('click', () => closePopup(popupImage)); // Слушатель клика для закрытия попапа с картинкой по кнопке закрыть

render ();

startFormValidation();