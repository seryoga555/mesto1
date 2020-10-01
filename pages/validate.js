function showInputError ({inputErrorClass, errorClass}, formElement, inputElement, errorMessage) { //функция добавления сообщения валидации
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};
 
function hideInputError ({inputErrorClass, errorClass}, formElement, inputElement) { //функция скрытия сообщений валидации
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}; 

function checkInputValidity ({inputErrorClass, errorClass}, formElement, inputElement) { //проверка вводимого на валидность
  if(!inputElement.validity.valid) {
    showInputError({inputErrorClass, errorClass}, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError({inputErrorClass, errorClass}, formElement, inputElement);
  };
};

function hasInvalidInput (inputList) { //проверка на валидность всех видимых полей
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState ({inactiveButtonClass}, inputList, buttonElement) { //функция включения/отключения кнопки отправки формы, исходя из валидности
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }; 
} 

function setFormEventListeners ({submitButtonSelector, inputSelector, ...rest}, formElement) { //функция устанавливает слушатели инпутов формы
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(rest, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity (rest, formElement, inputElement);
      toggleButtonState (rest, inputList, buttonElement);
    });
  });
};

function enableValidation ({formSelector, ...rest}) { //функция запускающая валидацию
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    setFormEventListeners(rest, form);
  });
};

function clearErrors(element) { //функция удаления ошибок валидации с попапов
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
};

enableValidation ({ //запуск функции валидации
  formSelector: '.popup__content',
  inputSelector: '.popup__form',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__form_error',
  errorClass: 'popup__error_visible'
});