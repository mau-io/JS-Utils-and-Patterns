// Simulación de una base de datos de usuarios
const users = [
  {
    id: 1,
    username: "mau",
    password: "password123",
    role: "admin",
  },
  {
    id: 2,
    username: "jane",
    password: "password456",
    role: "user",
  },
];

class Request {
  constructor(url, user) {
    this.url = url;
    this.user = user;
  }
}

class Response {
  constructor() {
    this.status = 200;
    this.data = "OK";
  }
}

class Filter {
  execute(request) {
    throw new Error("This method must be overridden");
  }
}

class AuthenticationFilter extends Filter {
  execute(request) {
    if (request.user) {
      console.log("Authenticated: " + request.user.username);
    } else {
      console.log("Authentication failed");
    }
  }
}

class AuthorizationFilter extends Filter {
  execute(request) {
    if (request.user && request.user.role === "admin") {
      console.log("Authorized: " + request.user.username);
    } else {
      console.log("Authorization failed");
    }
  }
}

class LoggingFilter extends Filter {
  execute(request) {
    console.log("Logging request: " + request.url);
  }
}

class FilterChain {
  constructor() {
    this.filters = [];
  }

  addFilter(filter) {
    this.filters.push(filter);
  }

  execute(request) {
    this.filters.forEach((filter) => filter.execute(request));
  }
}

class FilterManager {
  constructor() {
    this.filterChain = new FilterChain();
  }

  addFilter(filter) {
    this.filterChain.addFilter(filter);
  }

  processRequest(request) {
    this.filterChain.execute(request);
  }
}

// Ejemplo de uso
const loginUser = users.find((user) => user.username === "mau" && user.password === "password123");

const request = new Request("/admin/dashboard", loginUser);

const filterManager = new FilterManager();
filterManager.addFilter(new AuthenticationFilter());
filterManager.addFilter(new AuthorizationFilter());
filterManager.addFilter(new LoggingFilter());

filterManager.processRequest(request);