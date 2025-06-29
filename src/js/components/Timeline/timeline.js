import './timeline.css'
import getLocation from '../../getLocation';
import createMessage from '../message/message';
import LocationForm from '../locationForm/locationForm';

export default class Timeline {
    constructor(container) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('This is not HTML element!');
        }
        this.container = container;

        this.sendMessage = this.sendMessage.bind(this);
        this.manualCoords = null;
        this.init();
    }

    //Инициализация приложения
    init() {
        this.renderTimeline();
    }

    renderTimeline() {
        const timelineBlock = document.createElement('div');
        timelineBlock.classList.add('timeline-block');

        const messageBlock = document.createElement('div');
        messageBlock.classList.add('message-block');
        this.messageBlock = messageBlock

        const messageForm = document.createElement('form');
        messageForm.classList.add('message-form');

        const messageInput = document.createElement('input');
        messageInput.classList.add('message-input');
        messageInput.type = 'text';
        messageInput.name = 'message';

        messageForm.appendChild(messageInput);

        timelineBlock.append(messageBlock, messageForm);

        this.container.appendChild(timelineBlock);

        messageForm.addEventListener('submit', this.sendMessage);
    }

    async sendMessage(e) {
        e.preventDefault();
        let location;
        try {
            location = await getLocation();

        } catch (error) {
            if (this.container.querySelector('.location-form')) return;

            if (this.manualCoords) {
                location = this.manualCoords;
            } else {
                new LocationForm(this.container, (coords) => {
                    this.manualCoords = coords;
                    this.sendMessage(e)
                });
                return
            }
        }

        const messageText = e.target.elements.message.value;
        if (!messageText) return;

        const messageItem = createMessage(messageText, location);
        this.messageBlock.appendChild(messageItem);
        e.target.reset();
    }
}