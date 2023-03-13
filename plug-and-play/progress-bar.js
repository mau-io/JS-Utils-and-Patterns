
const ANSI = {
  reset: '\033[0m',
  // Text color
  red: '\033[31m',
  green: '\033[32m',
  blue: '\033[34m',

  yellow: '\033[33m',
  magenta: '\033[35m',
  cyan: '\033[36m',
  white: '\033[37m',
  gray: '\033[90m',
  // Background color
  bgRed: '\033[41m',
  bgGreen: '\033[42m',
  bgYellow: '\033[43m',
  bgBlue: '\033[44m',
  bgMagenta: '\033[45m',
  bgCyan: '\033[46m',
  bgWhite: '\033[47m'
}

class ProgressBar {
  constructor(total) {
    if (ProgressBar.instance instanceof ProgressBar) {
      return ProgressBar.instance;
    }
    this.total = total;
    this.barLength = 50;
    this.filledCaracter = '█';
    this.emptyCaracter = '-';
    this.percent = 0;
    this.#initializeBar();
    ProgressBar.instance = this;
  }

  #initializeBar() {
    this.filledBar = ANSI.green + this.filledCaracter.repeat(0) + ANSI.reset;
    this.emptyBar = ANSI.yellow + this.emptyCaracter.repeat(this.barLength) + ANSI.reset;
    this.#updateBar();
  }

  #updateBar() {
    this.percent = Math.round((this.progress / this.total) * 100);
    const filledLength = Math.round(this.barLength * (this.progress / this.total));
    const emptyLength = this.barLength - filledLength;
    this.filledBar = ANSI.green + this.filledCaracter.repeat(filledLength) + ANSI.reset;
    this.emptyBar = ANSI.yellow + this.emptyCaracter.repeat(emptyLength) + ANSI.reset;
  }

  update(progress) {
    this.progress = progress;
    this.#updateBar();
    this.#print();
  }

  #print() {
    process.stdout.write(`[${this.filledBar}${this.emptyBar}] ${this.percent}%\r`);
    if (this.progress === this.total) {
      process.stdout.write('\n');
    }
  }
}

//module.exports = ProgressBar;
const progressBar = new ProgressBar(10);

function countToTen() {
  for (let i = 1; i <= 10; i++) {
    progressBar.update(i);
    // Simula una tarea que tarda un poco en completarse
    for (let j = 0; j < 10000000; j++);
  }
}

countToTen();