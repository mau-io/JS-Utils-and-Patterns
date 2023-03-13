const defaultOptions = {
  loginURL: '/api/login',
  logoutURL: '/api/logout',
  authHeader: 'Authorization',
  tokenPrefix: 'Bearer',
  onLoginSuccess: () => console.log('Login successful'),
  onLoginError: (error) => console.error('Error on login:', error),
  onLogoutSuccess: () => console.log('Logout successful'),
  onLogoutError: (error) => console.error('Error on logout:', error)
};
/**
 * Clase que representa un plugin genérico
 */
class Plugin {
  /**
   * Constructor de la clase
   * @param {string} name - Nombre del plugin
   * @param {string} version - Versión del plugin
   * @param {object} api - Objeto con la API del plugin
   * @param {object} plugins - Objeto con los plugins adicionales que se utilizarán
   * @param {object} options - Objeto con las opciones de configuración del plugin
   */
  constructor(name, version = "1.0.0", api = {}, plugins = {}, options = {}) {

    if (!name || typeof name !== "string") {
      throw new Error("Plugin name must be a non-empty string");
    }

    if (typeof version !== "string") {
      throw new Error("Plugin version must be a non-empty string");
    }
  
    if (typeof options !== 'object' ) {
      throw new Error('Plugin options must be an object');
    }
  
    if (typeof api !== 'object' ) {
      throw new Error('Plugin api must be an object');
    }

    if (typeof plugins !== 'object' ) {
      throw new Error('Plugin plugins must be an object');
    }

    this.name = name;
    this.version = version;
    this.api = api;
    this.plugins = plugins;
    this.options = { ...defaultOptions, ...options };

    this.events = {};
  }

  /**
   * Inicializa el plugin con las opciones proporcionadas
   * @param {object} options - Objeto con las opciones de inicialización del plugin
   */
  init(options = {}) {
    this.options = { ...this.options, ...options }; // sobrescribimos las opciones predeterminadas con las opciones específicas proporcionadas al llamar al método init
    console.log(`Plugin ${this.name}-${this.version} initialized with the options:`, this.options);
    // Lógica de inicialización del plugin
  }

  /**
   * Libera los recursos y realiza limpieza antes de eliminar el plugin
   */
  destroy() {
    console.log(`Plugin ${this.name} destroyed`);
    // Lógica de detención del plugin
  }

  emit(event, data) {
    const handlers = this.events[event];
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }

  on(event, handler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }
}

module.exports = Plugin;