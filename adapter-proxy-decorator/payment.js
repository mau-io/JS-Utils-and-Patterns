// Adaptador
class PaymentProcessorAdapter {
  constructor(paymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  pay(amount) {
    return this.paymentProcessor.sendPayment(amount);
  }
}

// Proxy
class PaymentProcessorProxy {
  constructor(paymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  pay(amount) {
    if (amount > 100) {
      //throw new Error("Amount too high");
      console.error(`Error: Amount too high ${amount}`);
    }
    return this.paymentProcessor.pay(amount);
  }
}

// Decorador
class PaymentProcessorLoggerDecorator {
  constructor(paymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  pay(amount) {
    console.log(`Paying ${amount}...`);
    const result = this.paymentProcessor.pay(amount);
    console.log(`Payment completed with result ${result}`);
    return result;
  }
}

// Ejemplo de uso
class PaymentProcessor {
  sendPayment(amount) {
    console.log(`Sending payment of ${amount}...`);
    return "SUCCESS";
  }
}

const paymentProcessor = new PaymentProcessor();

// Adaptador
const adapter = new PaymentProcessorAdapter(paymentProcessor);
console.log(adapter.pay(50)); // "SUCCESS"

// Proxy
const proxy = new PaymentProcessorProxy(adapter);
console.log(proxy.pay(50)); // "SUCCESS"
console.log(proxy.pay(150)); // Error: Amount too high

// Decorador
const decorated = new PaymentProcessorLoggerDecorator(adapter);
console.log(decorated.pay(50)); // Logs "Paying 50..." and "Payment completed with result SUCCESS"