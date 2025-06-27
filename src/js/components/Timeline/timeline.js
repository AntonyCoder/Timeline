import './timeline.css'

export default class Timeline {
    constructor(container) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('This is not HTML element!');
        }
        this.container = container;

        this.init();
        this.sendMessage = this.sendMessage.bind(this);
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

        const messageForm = document.createElement('form');
        messageForm.classList.add('message-form');

        const messageInput = document.createElement('input');
        messageInput.classList.add('message-input');
        messageInput.type = 'text';

        messageForm.appendChild(messageInput);

        timelineBlock.append(messageBlock, messageForm);

        this.container.appendChild(timelineBlock);

        messageForm.addEventListener('submit', this.sendMessage);
    }

    sendMessage(e) {
        e.preventDefault();
        

    }
}