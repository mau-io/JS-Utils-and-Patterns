class EventAggregator {
  constructor() {
    this.events = {};
  }

  subscribe(eventType, callback) {
    if (!this.events[eventType]) {
      this.events[eventType] = [];
    }
    this.events[eventType].push(callback);
  }

  unsubscribe(eventType, callback) {
    if (this.events[eventType]) {
      this.events[eventType] = this.events[eventType].filter(
        (cb) => cb !== callback
      );
    }
  }

  publish(eventType, data) {
    if (this.events[eventType]) {
      this.events[eventType].forEach((callback) => callback(data));
    }
  }
}

class ComponentA {
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.eventAggregator.subscribe("dataChanged", this.handleDataChanged);
  }

  handleDataChanged(data) {
    console.log("ComponentA received data:", data);
  }
}

class ComponentB {
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  changeData(data) {
    this.eventAggregator.publish("dataChanged", data);
  }
}

const eventAggregator = new EventAggregator();
const componentA = new ComponentA(eventAggregator);
const componentB = new ComponentB(eventAggregator);

componentB.changeData({ newData: "componentB New data value" });
