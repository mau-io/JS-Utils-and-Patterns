
const Plugin = require('../Plugin.js');

class MyPluginDependency extends Plugin {
  constructor(name = 'MyPluginDependency', api) {
    super(name, "2.0.0", api)
    this.name = name;
    this.api = api;

    this.data = [];
  }

  init() {
    super.init()
  }

  methodFromOtherPlugin() {
    console.log('------------ methodFromOtherPlugin -----------------')
  }

}

//export default Plugin;
module.exports = MyPluginDependency