import validateLocation from '../../validateLocation';
import './locationForm.css';

export default class LocationForm {
    constructor(container, onCoordinatesValidated) {
        this.container = container;

        this.onCoordinatesValidated = onCoordinatesValidated
        this.onSendLocation = this.onSendLocation.bind(this);
        this.renderForm();
    }

    renderForm() {
        const locationForm = document.createElement('form');
        locationForm.classList.add('location-form');

        const formTitle = document.createElement('p');
        formTitle.classList.add('form-title');
        formTitle.textContent = 'Что-то пошло не так...';

        const formText = document.createElement('p');
        formText.classList.add('form-text');
        formText.textContent = 'К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.'

        const formLabel = document.createElement('label');
        formLabel.classList.add('form-label');
        formLabel.textContent = 'Широта и долгота через запятую';

        this.formInput = document.createElement('input');
        this.formInput.classList.add('form-input');
        this.formInput.type = 'text';

        formLabel.appendChild(this.formInput);

        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-button');
        cancelButton.textContent = 'Отмена';

        cancelButton.addEventListener('click', this.closeForm);

        const sendButton = document.createElement('input');
        sendButton.classList.add('send-button');
        sendButton.textContent = 'Ок';
        sendButton.type = 'submit';

        buttonWrapper.append(cancelButton, sendButton);

        locationForm.append(formTitle, formText, formLabel, buttonWrapper);

        locationForm.addEventListener('submit', this.onSendLocation);

        this.container.append(locationForm);
    }

    onSendLocation(e) {
        e.preventDefault();

        const value = this.formInput.value.trim();

        const location = validateLocation(value)
        if(!location){
            return
        }

        const {latitude, longitude} = location

        this.onCoordinatesValidated({ latitude, longitude });

        e.target.remove();
    }

    closeForm(e) {
        const form = e.target.closest('form');
        form.remove();
    }
}