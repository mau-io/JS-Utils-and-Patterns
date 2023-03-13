
const Plugin = require('../Plugin.js');

class MyPlugin extends Plugin {
  constructor(name = 'myPlugin', api = 'sdsd') {
    super(api)
    this.name = name;
    this.api = api;
  }

  init() {
    console.log(`Inicializando plugin ${this.name}`);
    // Lógica específica del plugin que utiliza el objeto API
    //this.api.doSomething();
  }
}

//export default Plugin;
module.exports = MyPlugin