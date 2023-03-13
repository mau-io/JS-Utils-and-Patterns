const ANSI = {
  reset: '\033[0m',
  // Text color
  red: '\033[31m',
  green: '\033[32m',
  blue: '\033[34m',

  yellow: '\033[33m',
  magenta: '\033[35m',
  cyan: '\033[36m',
  white: '\033[37m',
  gray: '\033[90m',
  // Background color
  bgRed: '\033[41m',
  bgGreen: '\033[42m',
  bgYellow: '\033[43m',
  bgBlue: '\033[44m',
  bgMagenta: '\033[45m',
  bgCyan: '\033[46m',
  bgWhite: '\033[47m'
}

const Plugin = require('./Plugin.js');
class PluginManager {
  constructor(api) {
    this.api = api;
    this.plugins = {};
  }

  async loadPlugin(url, options = {}) {
    try {
      const plugin = await import(url);
      if (plugin && plugin.default && plugin.default.prototype instanceof Plugin) {

        const instance = new plugin.default(undefined, undefined, this.api, this.plugins, options);

        if (this.plugins[instance.name]) {
          console.warn(`${ANSI.bgYellow} Plugin ${instance.name} already registered. Overwriting. ${ANSI.reset}`);
        } else {
          this.plugins[instance.name] = instance;
          console.log(`${ANSI.green} * Plugin ${instance.name} loaded ${ANSI.reset}`);
        }
    
      } else {
        console.log(`${ANSI.red} Error loading plugin from ${url}: the module does not contain a valid plugin class ${ANSI.reset}`);
      }
    } catch (error) {
      console.error(`${ANSI.red} Error loading plugin from ${url}: ${error.message} ${ANSI.reset}`);
    }
  }
  
   // Listen to pluginInitialized event
  onPluginInitialized(handler) {
    this.on('pluginInitialized', handler);
  }

  registerPlugin(plugin) {
    if (!(plugin instanceof Plugin)) {
      throw new Error("Plugin must be an instance of the Plugin class");
    }

    if (this.plugins[plugin.name]) {
      console.warn(`Plugin ${plugin.name} already registered. Overwriting.`);
    }else {
      this.plugins[plugin.name] = plugin;
    }
    
  }

  unregisterPlugin(plugin) {
    if (!(plugin instanceof Plugin)) {
      throw new Error("Plugin must be an instance of the Plugin class");
    }

    if (this.plugins[plugin.name]) {
      delete this.plugins[plugin.name];
      plugin.destroy();
    } else {
      console.warn(`Plugin ${plugin.name} not found. Could not unregister.`);
    }
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

module.exports = PluginManager;