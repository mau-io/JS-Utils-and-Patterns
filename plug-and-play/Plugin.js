class Plugin {
  constructor(name, version = "1.0.0", options = {}) {
    if (!name || typeof name !== "string") {
      throw new Error("Plugin name must be a non-empty string");
    }
  
    if (typeof options !== 'object') {
      throw new Error('Plugin options must be an object');
    }
  
    this.name = name;
    this.version = version;
    this.options = options;
  }

  init(options) {
    console.log(`Inicializando ${this.name} con opciones:`, options);
    // Lógica de inicialización del plugin
  }

  stop() {
    console.log(`Deteniendo ${this.name}`);
    // Lógica de detención del plugin
  }
}

module.exports = Plugin;