class Request {
  constructor(url) {
    this.url = url;
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
    console.log("Authentication filter: " + request.url);
  }
}

class LoggingFilter extends Filter {
  execute(request) {
    console.log("Logging filter: " + request.url);
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
const request = new Request("/user/profile");
const filterManager = new FilterManager();
filterManager.addFilter(new AuthenticationFilter());
filterManager.addFilter(new LoggingFilter());

filterManager.processRequest(request);
