class Mediator {
  constructor() {
    this.colleagues = new Set();
  }

  register(colleague) {
    this.colleagues.add(colleague);
  }

  send(message, sender) {
    this.colleagues.forEach((colleague) => {
      if (colleague !== sender) {
        colleague.receive(message);
      }
    });
  }
}

class Colleague {
  constructor(mediator, name) {
    this.mediator = mediator;
    this.name = name;
    this.mediator.register(this);
  }

  send(message) {
    console.log(`${this.name} sends: ${message}`);
    this.mediator.send(message, this);
  }

  receive(message) {
    console.log(`${this.name} receives: ${message}`);
  }
}

const mediator = new Mediator();

const colleague1 = new Colleague(mediator, "Colleague 1");
const colleague2 = new Colleague(mediator, "Colleague 2");
const colleague3 = new Colleague(mediator, "Colleague 3");

colleague1.send("Hello, colleagues!");
colleague3.send("Good evening!");