class Plugin {
  constructor(name) {
    this.name = name;
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