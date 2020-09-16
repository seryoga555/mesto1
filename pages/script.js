let popup = document.querySelector('.popup');
let open = document.querySelector('.profile__edit-button');
let close = document.querySelector('.popup__close-button');
let savebtn = document.querySelector('.popup__button');

function openpopup() {
  popup.classList.add('popup_opened');
}

function closepopup() {
  popup.classList.remove('popup_opened');
}

open.addEventListener('click', openpopup);
close.addEventListener('click', closepopup);
savebtn.addEventListener('click', closepopup);


let formElement = document.querySelector('.popup__content');

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInput = formElement.querySelector('.popup__form_name');
    let jobInput = formElement.querySelector('.popup__form_job');
    
    nameInput = nameInput.value;
    jobInput = jobInput.value;

    let profilename = document.querySelector('.profile__name');
    let profilejob = document.querySelector('.profile__job');

    profilename.textContent = nameInput;
    profilejob.textContent = jobInput;
}

formElement.addEventListener('submit', formSubmitHandler);