import {popup} from './constants.js';
export class FormValidator {
  constructor(data, element){
    this._inputSelector = data.inputSelector
    this._submitButtonSelector = data.submitButtonSelector
    this._inactiveButtonClass = data.inactiveButtonClass
    this._inputErrorClass = data.inputErrorClass
    this._errorClass = data.errorClass
    this._element = element
  }

  _showInputError(formElement,inputElement,errorMessage){ // функция показа ошибки валидации
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(this._inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._errorClass)
  }

  _hideInputError(formElement,inputElement){ // функция скрытия ошибки 
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = ''
  }

  _checkInputValidity (formElement, inputElement) { // функция проверяет корректность введеных данных 
    if(!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else { 
      this._hideInputError(formElement, inputElement);
    };
  }

  _hasInvalidInput(inputList){ // функция возвращает информацию о наличии ошибки валидации
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _toggleButtonState(inputList, buttonElement){ // функция включает и выключает кнопку отправить
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass)
      buttonElement.disabled = true
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass)
      buttonElement.disabled = false
    }
  }

  _setFormEventListeners(formElement) { // функция устанавливает слушатели инпута на формы 
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector))
    const buttonElement = formElement.querySelector(this._submitButtonSelector)
    this._toggleButtonState(inputList, buttonElement)
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        this._checkInputValidity ( formElement,inputElement)
        this._toggleButtonState (inputList, buttonElement)
      })
    })
  }

  _clearErrors(element) { // Функция удаления ошибок для попапов
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


  enableValidation() { // функция запускающая процесс валидации
  this._setFormEventListeners(this._element); 
  }

  clearErrors() {
  this._clearErrors(this._element);
  }
}