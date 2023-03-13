
const Plugin = require('../Plugin.js');

class MyPlugin extends Plugin {
  constructor(name = 'myPlugin', version, api, plugins) {
    super(name, version, api, plugins)
    this.data = [];
    // Suscribirse a eventos
    super.on("dataReceived", this.addData.bind(this));
    
  }

  init(options) {
    super.init(options);
    console.log(this)
    // Lógica específica del plugin que utiliza el objeto API
    console.log(this.api.data);
    this.plugins.MyPluginDependency.methodFromOtherPlugin();
  }

  addData(data) {
    this.emit("someEvent", { message: data });
    this.data.push(data);
  }

  getData() {
    console.log("Obteniendo datos...");
    return this.data;
  }
}

//export default Plugin;
module.exports = MyPlugin