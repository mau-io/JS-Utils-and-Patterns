// Interfaz de Figura
class Shape {
  accept(visitor) {
    throw new Error("This method must be overridden");
  }
}

// Clases concretas de Figura
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  accept(visitor) {
    visitor.visitCircle(this);
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  accept(visitor) {
    visitor.visitRectangle(this);
  }
}

// Interfaz de Visitante
class ShapeVisitor {
  visitCircle(circle) {
    throw new Error("This method must be overridden");
  }

  visitRectangle(rectangle) {
    throw new Error("This method must be overridden");
  }
}

// Clase concreta de Visitante para calcular área
class AreaVisitor extends ShapeVisitor {
  visitCircle(circle) {
    const area = Math.PI * Math.pow(circle.radius, 2);
    console.log(`Area of circle: ${area}`);
  }

  visitRectangle(rectangle) {
    const area = rectangle.width * rectangle.height;
    console.log(`Area of rectangle: ${area}`);
  }
}

// Clase concreta de Visitante para calcular perímetro
class PerimeterVisitor extends ShapeVisitor {
  visitCircle(circle) {
    const perimeter = 2 * Math.PI * circle.radius;
    console.log(`Perimeter of circle: ${perimeter}`);
  }

  visitRectangle(rectangle) {
    const perimeter = 2 * (rectangle.width + rectangle.height);
    console.log(`Perimeter of rectangle: ${perimeter}`);
  }
}

// Example
const shapes = [new Circle(5), new Rectangle(4, 6)];
const areaVisitor = new AreaVisitor();
const perimeterVisitor = new PerimeterVisitor();

shapes.forEach((shape) => {
  shape.accept(areaVisitor);
  shape.accept(perimeterVisitor);
});