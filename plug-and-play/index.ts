import PluginManager from './PluginManager.js';

const fakeAPI = {
  data: [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
  ]
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
    loginURL: '/example',
    onLoginSuccess: () => console.log('Custom login success handler')
  });
 
  
})();


