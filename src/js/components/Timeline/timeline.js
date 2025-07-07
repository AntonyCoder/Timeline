import './timeline.css'
import getLocation from '../../getLocation';
import createMessage from '../message/message';
import LocationForm from '../locationForm/locationForm';
import TimelineForm from '../TimelineForm/timelineForm';

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

    //Отрисовка блока Timeline
    renderTimeline() {
        //Общий блок приложения
        const timelineBlock = document.createElement('div');
        timelineBlock.classList.add('timeline-block');

        //Блок вывода сообщений
        const messageBlock = document.createElement('div');
        messageBlock.classList.add('message-block');
        this.messageBlock = messageBlock;

        const timelineForm = new TimelineForm((audioUrl) => {
            this.sendAudioMessage(audioUrl);
        });
        const messageForm = timelineForm.renderForm();

        timelineBlock.append(messageBlock, messageForm);
        this.container.appendChild(timelineBlock);

        messageForm.addEventListener('submit', this.sendMessage);
    }

    //Отправка сообщения 
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
                    this.sendMessage(e);
                });
                return;
            }
        }

        const messageText = e.target.elements.message.value;
        if (!messageText) return;

        const messageItem = createMessage(messageText, location, 'text');
        this.messageBlock.appendChild(messageItem);
        e.target.reset();
    }

    async sendAudioMessage(audioUrl) {
        let location
        try {
            location = await getLocation();
        } catch (error) {
            if (this.manualCoords) {
                location = this.manualCoords;
            } else {
                new LocationForm(this.container, (coords) => {
                    this.manualCoords = coords;
                    this.sendMessage(e);
                });
                return;
            }
        }

        const messageItem = createMessage(null, location, 'audio', audioUrl);
        this.messageBlock.appendChild(messageItem);
    }
}