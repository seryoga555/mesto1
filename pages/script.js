let popup = document.querySelector('.popup');
let open = document.querySelector('.profile__edit-button');
let close = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__content');
let nameInput = formElement.querySelector('.popup__form_input_name');
let jobInput = formElement.querySelector('.popup__form_input_job');
let profilename = document.querySelector('.profile__name');
let profilejob = document.querySelector('.profile__job');

function openpopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profilename.textContent;
  jobInput.value = profilejob.textContent;
  
}

function closepopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profilename.textContent = nameInput.value;
    profilejob.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

open.addEventListener('click', openpopup);
close.addEventListener('click', closepopup);
formElement.addEventListener('submit', formSubmitHandler);
