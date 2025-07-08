import Stopwatch from '../Stopwatch/stopwatch';
import './timelineForm.css'

export default class TimelineForm {
    constructor(onAudioReady) {
        this.onAudioReady = onAudioReady;

        this.onVoiceButton = this.onVoiceButton.bind(this);
        this.onCameraButton = this.onCameraButton.bind(this);

        this.media = null;
        this.recorder = null;
        this.chunks = [];
        this.isCanceled = false;
    }

    renderForm() {
        //Форма отправки сообщения
        const messageForm = document.createElement('form');
        messageForm.classList.add('message-form');

        //Поле ввода сообщения
        const messageInput = document.createElement('input');
        messageInput.classList.add('message-input');
        messageInput.type = 'text';
        messageInput.name = 'message';

        //Блок кнопок аудио и видео 
        const recorderButtonWrapper = document.createElement('div');
        recorderButtonWrapper.classList.add('recorder-button-wrapper');
        this.recorderButtonWrapper = recorderButtonWrapper;

        //Кнопка записи голосового сообщения
        const voiceButton = document.createElement('button');
        voiceButton.type = 'button';
        voiceButton.classList.add('voice-button');

        voiceButton.addEventListener('click', this.onVoiceButton);

        //Кнопка записи видео сообщения
        const cameraButton = document.createElement('button');
        cameraButton.type = 'button';
        cameraButton.classList.add('camera-button');

        //Блок управления записью
        const recorderBlock = document.createElement('div');
        recorderBlock.classList.add('recorder-block', 'hidden');
        this.recorderBlock = recorderBlock;

        //Кнопка завершения записи
        const stopRecordButton = document.createElement('button');
        stopRecordButton.type = 'button';
        stopRecordButton.classList.add('stop-record-button');
        this.stopRecordButton = stopRecordButton;

        //Секундомер отсчета записи
        const stopwatch = document.createElement('div');
        stopwatch.classList.add('stopwatch');
        stopwatch.textContent = '00:00';
        this.stopwatch = stopwatch

        //Кнопка отмены записи
        const cancelRecordButton = document.createElement('button');
        cancelRecordButton.type = 'button';
        cancelRecordButton.classList.add('cancel-record-button');
        this.cancelRecordButton = cancelRecordButton;

        recorderBlock.append(stopRecordButton, stopwatch, cancelRecordButton);

        cameraButton.addEventListener('click', this.onCameraButton);

        recorderButtonWrapper.append(voiceButton, cameraButton);

        messageForm.append(messageInput, recorderButtonWrapper, recorderBlock);

        this.onStopwatch = new Stopwatch(this.stopwatch);

        return messageForm;
    }

    //Обработка нажатия на кнопку записи голосового
    async onVoiceButton() {
        this.isCanceled = false;
        this.showRecorderBlock();
        this.onStopwatch.start();

        this.media = await navigator.mediaDevices.getUserMedia({ audio: true })
        this.recorder = new MediaRecorder(this.media);
        this.chunks = [];

        this.cancelRecordButton.addEventListener('click', () => {
            this.cancelRecording();
        })

        this.recorder.addEventListener('dataavailable', (event) => {
            this.chunks.push(event.data);
        })

        this.recorder.addEventListener('stop', () => {
            if (!this.chunks.length || this.isCanceled) return;

            const blob = new Blob(this.chunks);

            const audioUrl = URL.createObjectURL(blob);
            if (this.onAudioReady) {
                this.onAudioReady(audioUrl);
            }

            this.stopMediaStream();
            this.hideRecorderBlock();
        })

        this.recorder.start();

        this.stopRecordButton.addEventListener('click', () => {
            this.recorder.stop();
            this.onStopwatch.stop();
        })
    }

    //Отмена записи
    cancelRecording() {
        this.isCanceled = true;
        if (this.recorder && this.recorder.state !== 'inactive') {
            this.recorder.stop();
        }
        this.chunks = [];
        this.stopMediaStream();
        this.hideRecorderBlock();

        this.onStopwatch.stop();
    }

    //Остановка потока
    stopMediaStream() {
        if (this.media) {
            this.media.getTracks().forEach(track => track.stop());
            this.media = null;
        }
    }

    //Запуск счетчика времени записи 
    showRecordTime() {

    }

    //Обработка нажатия на кнопку записи видео
    onCameraButton() {
        console.log('camera');
    }

    //Показ блока записи
    showRecorderBlock() {
        this.recorderButtonWrapper.classList.add('hidden');
        this.recorderBlock.classList.remove('hidden');
    }

    //Скрытие блока записи
    hideRecorderBlock() {
        this.recorderButtonWrapper.classList.remove('hidden');
        this.recorderBlock.classList.add('hidden');
    }
}