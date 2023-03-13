
const ANSI = {
  reset: '\033[0m',
  // Text color
  red: '\033[31m',
  green: '\033[32m',
  blue: '\033[34m',
}

const Plugin = require('./Plugin.js');
class PluginManager {
  constructor() {
    this.plugins = {};
  }

  async loadPlugin(url) {
    try {
      const plugin = await import(url);
      if (plugin && plugin.default && plugin.default.prototype instanceof Plugin) {
        const instance = new plugin.default();

        this.plugins[instance.name] = instance;

        console.log(`${ANSI.green} * Plugin ${instance.name} cargado correctamente ${ANSI.reset}`);
      } else {
        console.log(`${ANSI.red} Error loading plugin from ${url}: the module does not contain a valid plugin class ${ANSI.reset}`);
      }
    } catch (error) {
      console.error(`${ANSI.red} Error loading plugin from ${url}: ${error.message} ${ANSI.reset}`);
    }
  }

  registerPlugin(plugin) {
    this.plugins[plugin.name] = plugin;
  }

  unregisterPlugin(plugin) {
    delete this.plugins[plugin.name];
  }

  getPlugin(name) {
    return this.plugins[name];
  }

  getPlugins() {
    return Object.values(this.plugins);
  }

  async initPlugins() {
    const plugins = this.getPlugins();
    for (const plugin of plugins) {
      try {
        await plugin.init();
      } catch (error) {
        console.error(`${ANSI.red} Error initializing plugin ${plugin.name}: ${error.message} ${ANSI.reset}`);
      }
    }
  }
}

(async() => {
  // Ejemplo de uso
  const pluginManager = new PluginManager();

  // Cargar un plugin desde una URL
  await pluginManager.loadPlugin("./plugins/MyPlugin.js");

   // Cargar un plugin desde una URL
   await pluginManager.loadPlugin("./plugins/NotFound.js");

  // Registrar un plugin manualmente
  //pluginManager.registerPlugin(new Plugin("myPlugin"));

  // Obtener un plugin por nombre
  const myPlugin = pluginManager.getPlugin("myPlugin");

  // Obtener todos los plugins registrados
  const allPlugins = pluginManager.getPlugins();

  // Inicializar el plugin
  //myPlugin.init();

  pluginManager.initPlugins()
})();