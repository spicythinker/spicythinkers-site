
class SpeedReader {
  constructor(container, options = {}) {
    this.container = container;
    this.mode = options.mode || "stack";
    this.wpm = options.wpm || 300;
    this.words = [];
    this.index = 0;
    this.timer = null;
    this.isPaused = false;
    this.log = [];
    this.onComplete = options.onComplete || function () {};
  }

  loadText(text) {
    this.words = text.trim().split(/\s+/);
    this.index = 0;
    this.log = [];
  }

  start() {
    if (this.timer) clearInterval(this.timer);
    this.container.innerHTML = "";
    this.isPaused = false;
    const interval = 60000 / this.wpm;

    const displayNextWord = () => {
      if (this.isPaused || this.index >= this.words.length) {
        if (this.index >= this.words.length) {
          clearInterval(this.timer);
          this.onComplete(this.log);
        }
        return;
      }

      const word = this.words[this.index];
      if (this.mode === "stack") {
        const el = document.createElement("div");
        el.className = "word";
        el.textContent = word;
        this.container.appendChild(el);
        this.container.scrollTop = this.container.scrollHeight;
      } else {
        this.container.innerHTML = "";
        const el = document.createElement("div");
        el.className = "word";
        el.textContent = word;
        this.container.appendChild(el);
      }

      this.log.push({ word, timestamp: new Date().toISOString() });
      this.index++;
    };

    displayNextWord();
    this.timer = setInterval(displayNextWord, interval);
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this.start();
    }
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.isPaused = false;
  }

  setSpeed(wpm) {
    this.wpm = wpm;
  }

  setMode(mode) {
    this.mode = mode;
  }

  getLog() {
    return this.log;
  }
}
