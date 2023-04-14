// Interfaz Element
class Element {
  accept(visitor) {
    throw new Error("This method must be overridden");
  }
}

// Element
class ConcreteElementA extends Element {
  accept(visitor) {
    visitor.visitConcreteElementA(this);
  }

  operationA() {
    return "ConcreteElementA operation";
  }
}

class ConcreteElementB extends Element {
  accept(visitor) {
    visitor.visitConcreteElementB(this);
  }

  operationB() {
    return "ConcreteElementB operation";
  }
}

// Interfaz Visitor
class Visitor {
  visitConcreteElementA(concreteElementA) {
    throw new Error("This method must be overridden");
  }

  visitConcreteElementB(concreteElementB) {
    throw new Error("This method must be overridden");
  }
}

// Visitor
class ConcreteVisitor extends Visitor {
  visitConcreteElementA(concreteElementA) {
    console.log(`Visitor on ${concreteElementA.operationA()}`);
  }

  visitConcreteElementB(concreteElementB) {
    console.log(`Visitor on ${concreteElementB.operationB()}`);
  }
}

// Example
const elements = [new ConcreteElementA(), new ConcreteElementB()];
const visitor = new ConcreteVisitor();

elements.forEach((element) => element.accept(visitor));
