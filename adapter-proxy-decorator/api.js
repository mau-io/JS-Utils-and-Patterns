process.env.NODE_ENV = 'test'

// Interfaz para implementar distintas estrategias de cache
class CacheStrategy {
  constructor() {
    if (this.constructor === CacheStrategy) {
      throw new TypeError('Cannot construct abstract instances directly');
    }
  }

  storeResponse(endpoint, response) {
    throw new TypeError('Method not implemented');
  }
}

// Implementación de CacheStrategy que almacena las respuestas por un tiempo limitado
class TimeBasedCacheStrategy extends CacheStrategy {
  constructor(timeout = 1000 * 60 * 5) { // Por defecto, almacenar las respuestas por 5 minutos
    super();
    this.cache = {};
    this.timeout = timeout;
  }

  storeResponse(endpoint, response) {
    console.log(`${this.constructor.name}: Storing response in cache for ${endpoint}`);
    this.cache[endpoint] = {
      response,
      expires: Date.now() + this.timeout,
    };
  }

  getResponse(endpoint) {
    const cachedResponse = this.cache[endpoint];
    if (cachedResponse && cachedResponse.expires > Date.now()) {
      console.log(`${this.constructor.name}: Cache hit for ${endpoint}`);
      return cachedResponse.response;
    }
    console.log(`${this.constructor.name}: Cache miss for ${endpoint}`);
    return null;
  }
}

// Interfaz del adaptador
class HttpAdapter {
  async fetch(endpoint) {}
}

// Adaptador para utilizar una librería de terceros (en este caso "axios")
class AxiosAdapter extends HttpAdapter {
  constructor() {
    super();
    this.axios = require('axios');
  }

  async fetch(endpoint) {
    console.log(`${this.constructor.name}: Fetching ${endpoint}`);
    const response = await this.axios.get(endpoint);
    return {
      data: response.data
    };
  }
}

// Adaptador para utilizar una librería falsa (para fines de pruebas)
class FakeAxiosAdapter extends HttpAdapter {
  async fetch(endpoint) {
    console.log(`${this.constructor.name}: Fetching ${endpoint}`);
    return {
      data: {
        id: 1,
        name: "John Doe"
      }
    };
  }
}

// Proxy para controlar el acceso a la API y evitar peticiones innecesarias
class APICachingProxy {
  constructor(api, cacheStrategy) {
    this.api = api;
    this.cacheStrategy = cacheStrategy;
  }

  async fetch(endpoint) {
    const cachedResponse = this.cacheStrategy.getResponse(endpoint);

    if (cachedResponse) {
      console.log(`${this.constructor.name}: Cache hit for ${endpoint}`);
      return cachedResponse;
    }

    console.log(`${this.constructor.name}: Cache miss for ${endpoint}`);
    const response = await this.api.fetch(endpoint);
    this.cacheStrategy.storeResponse(endpoint, response);
    return response;
  }
}

// Decorador para añadir registro de actividad y caché a la API
class ActivityLoggerAPIDecorator {
  constructor(api) {
    this.api = api;
  }

  async fetch(endpoint) {
    console.log(`${this.constructor.name}: Logging activity for ${endpoint}`);
    const response = await this.api.fetch(endpoint);
    console.log(`${this.constructor.name}: Activity for ${endpoint} logged`);
    return response;
  }
}

// Ejemplo de uso
//const api = new APICachingProxy(new ActivityLoggerAPIDecorator(new AxiosAdapter()));

const api = new ActivityLoggerAPIDecorator(
  new APICachingProxy(
    process.env.NODE_ENV === 'test'
      ? new FakeAxiosAdapter()
      : new AxiosAdapter(),
    new TimeBasedCacheStrategy()
  )
);

(async () => {
  const result = await api.fetch('https://jsonplaceholder.typicode.com/todos/1');
  console.log(result)
  const result2 = await api.fetch('https://jsonplaceholder.typicode.com/todos/2');
  console.log(result2)
  const result3 = await api.fetch('https://jsonplaceholder.typicode.com/todos/1'); // Esta petición debe ser un "cache hit"
  console.log(result3)
})()