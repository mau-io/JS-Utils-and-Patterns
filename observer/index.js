class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer)
  }

  notify(data) {
    this.observers.forEach(e => {
      e.refresh(data)
    });
  }

}

class Observer {
  constructor(fn) {
    this.fn = fn;
  }

  refresh(data) {
    this.fn(data);
  }
}

const s = new Subject();
const o1 = new Observer( d => console.log('observer ' + d));
const o2 = new Observer( d => {
  showElement.innerHTML = d;
});

s.subscribe(o1);
s.subscribe(o2);
//s.unsubscribe(o1)

function change() {
  s.notify(inputText.value);
}

// Second Example

class ItemSubject extends Subject {
  constructor() {
    super();
    this.data = [];
  }
  add(item){
    this.data.push(item);
    this.notify(this.data)
  }
}

class HtmlElementObserver{
  constructor(element) {
    this.element = element;
  }

  refresh(data) {
    this.element.innerHTML = data.reduce((ac, e) => {
      return ac + `
      <p> ${e} </p> 
      `
    }, '');
  }
}

const items = new ItemSubject();
const div1Observer = new HtmlElementObserver(div1);
const div2Observer = new HtmlElementObserver(h1Element);

const observer1 = new Observer((data) => {
  div2.innerHTML = data.length;
});

items.subscribe(div1Observer);
items.subscribe(div2Observer);
items.subscribe(observer1);

function add() {
  items.add(inputName.value);
}