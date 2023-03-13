interface Component {
  getDetails(): string // operation
}

class ProductComponent implements Component {
  
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  getDetails(): string {
    return this.name;
  }
  
}

abstract class ProductDecorator implements Component {
  protected component : Component;
  constructor(component: Component) {
    this.component = component;
  }
  getDetails(): string {
    return this.component.getDetails();
  }
}

// decorator 1
class ComercialInfoProductDecorator extends ProductDecorator {
  private tradename: string;
  private brand: string;

  constructor(component: Component, tradename: string, brand: string) {
    super(component);
    this.tradename = tradename;
    this.brand = brand;
  }

  getDetails(): string {
    return `${super.getDetails()} ${this.tradename} ${this.brand}`;
  }
}

// decorator 2
class StoreProductDecorator extends ProductDecorator {
  private price: number;

  constructor(component: Component, price: number) {
    super(component);
    this.price = price;
  }

  getDetails(): string {
    return `${super.getDetails()} $${this.price}`;
  }
}

// decorator 3
class HTMLProductDecorator extends ProductDecorator {

  getDetails(): string {
    return `<p>${super.getDetails()}</p>`;
  }
}


// example
// component
const productComponent = new ProductComponent('Beer');
console.log(productComponent.getDetails());

// component + decorator
const comercialInfoProductDecorator = new ComercialInfoProductDecorator(productComponent, 'example 1',  'example 2');
console.log(comercialInfoProductDecorator.getDetails());

// component + decorator 2
const storeProductDecorator = new StoreProductDecorator(comercialInfoProductDecorator, 100.50);
console.log(storeProductDecorator.getDetails());

// component + decorator 3
const htmlProductDecorator = new HTMLProductDecorator(storeProductDecorator);
console.log(htmlProductDecorator.getDetails());