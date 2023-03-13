class Singleton {
  constructor() {
    this.id = Math.random();
    if(Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
  }
}

const singleton = new Singleton();
console.log(singleton.id);
const singleton2 = new Singleton();
console.log(singleton2.id);