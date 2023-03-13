// component
class ProductComponent {
  constructor(name) {
    this.name = name;
  }
  getDetails() {
    return this.name;
  }
}

// decorator
class ProductDecorator {
  constructor(productComponent) {
    this.productComponent = productComponent;
  }
  getDetails() {
    return this.productComponent.getDetails();
  }
}

class ComercialInfoProductDecorator extends ProductDecorator {
  
  constructor(productComponent, tradename, brand) {
    super(productComponent); 
    this.tradename = tradename;
    this.brand = brand;
  }

  getDetails() {
    return `${this.tradename} ${this.brand} ${super.getDetails()}`;
  }
}

class StoreProductDecorator extends ProductDecorator {
  
  constructor(productComponent, price) {
    super(productComponent); 
    this.price = price;
  }

  getDetails() {
    return `${super.getDetails()} $${this.price}`;
  }
}

// example
const productComponent = new ProductComponent('Beer');
console.log(productComponent.getDetails());

// using decorator 1
const comercialInfoProductDecorator = new ComercialInfoProductDecorator(productComponent, 'Japan', 'ERT');
console.log(comercialInfoProductDecorator.getDetails());

// using decorator 2
//const storeProductDecorator = new StoreProductDecorator(productComponent, 100.50);
const storeProductDecorator = new StoreProductDecorator(comercialInfoProductDecorator, 100.50);
console.log(storeProductDecorator.getDetails());