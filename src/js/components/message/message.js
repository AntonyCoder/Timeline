import './message.css';

export default function createMessage(text, location, type, data) {
    const date = new Date();
    const { latitude, longitude } = location

    const messageItem = document.createElement('div');
    messageItem.classList.add('message-item');

    const messageDate = document.createElement('p');
    messageDate.classList.add('message-date');
    messageDate.textContent = date.toLocaleString();

    let message;
    if (type === 'text') {
        message = document.createElement('p');
        message.classList.add('text-message');
        message.textContent = text;
    }
    if (type === 'audio') {
        message = document.createElement('audio');
        message.classList.add('audio-message');
        message.controls = true;
        message.src = data;
    }
    if (type === 'video') {
        message = document.createElement('audio');
        message.classList.add('video-message');
        message.srcObject = data;
    }


    const messageLocation = document.createElement('p');
    messageLocation.classList.add('message-location');
    messageLocation.textContent = `[${latitude}, ${longitude}]`

    messageItem.append(messageDate, message, messageLocation);

    return messageItem;
}