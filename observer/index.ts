interface IObserver<T> {
  refresh(value: T) : void;
}

interface ISubject<T> {
  observers: IObserver<T>[];
  subscribe(observers: IObserver<T>) : void;
  unsubscribe(observers: IObserver<T>) : void;
  notify(value: T) : void;
}

class Subject<T> implements ISubject<T> {
  observers: IObserver<T>[];
  
  constructor(){
    this.observers = [];
  }
  
  subscribe(observer: IObserver<T>): void {
    this.observers.push(observer);
  }
  
  unsubscribe(observer: IObserver<T>): void {
    this.observers = this.observers.filter(obs => obs !== observer)
  }
  
  notify(value: T): void {
    this.observers.forEach(e => {
      e.refresh(value)
    });
  }  
}

class Observer<T> implements IObserver<T> {

  private fn: (value: T) => void;
  constructor(fn: (value: T) => void) {
    this.fn = fn;
  }

  refresh(value: T): void {
    this.fn(value);
  }
  
}

const subject = new Subject<number>();
const obs1 = new Observer<number>((number) => {
  console.log(`Observer 1 -> ${number}`);
});

const obs2 = new Observer<number>((number) => {
  console.log(`Observer 2 -> ${number}`);
}); 

subject.subscribe(obs1);
subject.subscribe(obs2);
subject.notify(50);
subject.notify(70);


const subject2 = new Subject<string>();
const obs3 = new Observer<string>((string) => {
  console.log(`Observer 3 -> ${string.toLocaleUpperCase()}`);
});

subject2.subscribe(obs3);
subject2.notify("example");