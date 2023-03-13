const PluginManager = require('./PluginManager.js');

const fakeAPI = {
  data: [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    { id: 3, name: "Bob", age: 40 },
  ],

  getAllData: function() {
    return this.data;
  },

  getDataById: function(id) {
    return this.data.find(item => item.id === id);
  },

  addData: function(newData) {
    this.data.push(newData);
    return newData;
  },

  updateData: function(id, updatedData) {
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updatedData };
      return this.data[index];
    } else {
      return null;
    }
  },

  deleteData: function(id) {
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      const deletedItem = this.data.splice(index, 1);
      return deletedItem[0];
    } else {
      return null;
    }
  }
};

(async() => {
  // Ejemplo de uso
  const pluginManager = new PluginManager(fakeAPI);

  // Cargar un plugin desde una URL
  await pluginManager.loadPlugin("./plugins/my-plugin.js");
  await pluginManager.loadPlugin("./plugins/dependency-plugin.js");
  await pluginManager.loadPlugin("./plugins/dependency-plugin.js");
   // Cargar un plugin desde una URL
  await pluginManager.loadPlugin("./plugins/NotFound.js");

  // Registrar un plugin manualmente
  //pluginManager.registerPlugin(new Plugin("myPlugin"));

  // Obtener un plugin por nombre
  const myPlugin = pluginManager.getPlugin("myPlugin");


  myPlugin.on("someEvent", data => {
    console.log(`Plugin ${myPlugin.name} received event 'someEvent' with data:`, data);
  });
  myPlugin.emit("dataReceived", { data: 100 });

    for (let i = 1; i <= 10; i++) {
      myPlugin.addData(i)
    }
  
  // Obtener todos los plugins registrados
  //const allPlugins = pluginManager.getPlugins();
  // Inicializar el plugin
  //myPlugin.init();
  //pluginManager.initPlugins();
  myPlugin.init({
    loginURL: '/dsfdsfdsfsdf',
    onLoginSuccess: () => console.log('Custom login success handler')
  });
 
  
})();


