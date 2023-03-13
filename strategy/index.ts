interface Strategy {
  login(user: string, password: string) : boolean;
}

class LoginContext {
  private strategy: Strategy;
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }
  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  login(user: string, password: string): boolean{
    return this.strategy.login(user, password);
  }
}

class LoginDBStrategy implements Strategy {
  login(user: string, password: string): boolean {
    console.log('LoginDBStrategy');
    return true;
  }
}

class ServiceDBStrategy implements Strategy {
  login(user: string, password: string): boolean {
    console.log('ServiceDBStrategy');
    return true;
  }
}

const auth = new LoginContext(new LoginDBStrategy());
console.log(auth.login('admin', '123'));

auth.setStrategy(new ServiceDBStrategy());
console.log(auth.login('admin', '123'));