class SaleContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  calculate(amount) {
    return this.strategy.calculate(amount);
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

}

class RegularSaleStrategy {
  constructor(tax) {
    this.tax = tax;
  }

  calculate(amount) {
    return amount + (amount * this.tax);
  }

}

class DiscountSaleStrategy {
  constructor(tax, discount) {
    this.tax = tax;
    this.discount = discount;
  }

  calculate(amount) {
    return amount + (amount * this.tax) - this.discount;
  }

}

class ForeignSaleStrategy {

  calculate(amount) {
    return amount * this.getDollarPrice();
  }

  getDollarPrice() {
    return 15;
  }
  
}

const discountSaleStrategy = new DiscountSaleStrategy(0.16, 50);
const regularSaleStrategy = new RegularSaleStrategy(0.16);
const foreignSaleStrategy = new ForeignSaleStrategy();

const sale = new SaleContext(regularSaleStrategy);
console.log(sale.calculate(100)); // 116

sale.setStrategy(discountSaleStrategy);
console.log(sale.calculate(100)); // 66

sale.setStrategy(foreignSaleStrategy);
console.log(sale.calculate(100)); // 1500