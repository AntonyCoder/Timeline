import './message.css';

export default function createMessage(text, location){
    const date = new Date();
    const {latitude, longitude} = location

    const messageItem = document.createElement('div');
    messageItem.classList.add('message-item');

    const messageDate = document.createElement('p');
    messageDate.classList.add('message-date');
    messageDate.textContent = date.toLocaleString();

    const messageText = document.createElement('p');
    messageText.classList.add('message-text');
    messageText.textContent = text;

    const messageLocation = document.createElement('p');
    messageLocation.classList.add('message-location');
    messageLocation.textContent = `[${latitude}, ${longitude}]`

    messageItem.append(messageDate, messageText, messageLocation);

    return messageItem;
}