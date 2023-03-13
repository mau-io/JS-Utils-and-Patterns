// Implementación de la interfaz de implementación (Implementor)
class Implementor {
  operation() {
    throw new Error('Operation must be implemented by concrete implementors');
  }
}

// Implementación específica A
class ConcreteImplementorA extends Implementor {
  operation() {
    return 'Concrete Implementor A';
  }
}

// Implementación específica B
class ConcreteImplementorB extends Implementor {
  operation() {
    return 'Concrete Implementor B';
  }
}

// Abstracción
class Abstraction {
  constructor(implementor) {
    this.implementor = implementor;
  }

  operation() {
    return `Abstraction with ${this.implementor.operation()}`;
  }
}

// Ejemplo de uso
const implementorA = new ConcreteImplementorA();
const implementorB = new ConcreteImplementorB();

const abstraction1 = new Abstraction(implementorA);
console.log(abstraction1.operation()); // "Abstraction with Concrete Implementor A"

const abstraction2 = new Abstraction(implementorB);
console.log(abstraction2.operation()); // "Abstraction with Concrete Implementor B"
