// Componente
class UserService {
  constructor() {}

  login(username, password) {
    console.log(`User ${username} logged in.`);
  }

  logout(username) {
    console.log(`User ${username} logged out.`);
  }
}

// Decorador
class Logger {
  constructor(service) {
    this.service = service;
  }

  login(username, password) {
    console.log(`Before login.`);
    const result = this.service.login(username, password);
    console.log(`After login.`);
    return result;
  }

  logout(username) {
    console.log(`Before logout.`);
    const result = this.service.logout(username);
    console.log(`After logout.`);
    return result;
  }
}

// Uso del Decorador
const userService = new UserService();
const loggerUserService = new Logger(userService);

loggerUserService.login('John', '1234');
loggerUserService.logout('John');