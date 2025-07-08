export default class Stopwatch {
    constructor(element) {
        this.element = element
        this.time = 0;
        this.interval = null;
    }

    start() {
        if (this.interval) return;

        this.interval = setInterval(() => {
            this.time++;
            this.updateTime();
        }, 1000)
    }

    stop() {
        clearInterval(this.interval);
        this.time = 0;
        this.interval = null;
        this.element.textContent = '00:00';
    }

    updateTime() {
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;

        const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

        this.element.textContent = formatted;
    }
}