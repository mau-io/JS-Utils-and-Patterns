// Interfaz IRepository
class IRepository {
  create(user) {
    throw new Error("This method must be overridden");
  }

  getById(id) {
    throw new Error("This method must be overridden");
  }

  // Otros métodos como update, delete, etc.
}

// Implementación de repositorio en memoria
class InMemoryUserRepository extends IRepository {
  constructor() {
    super();
    this.users = new Map();
  }

  create(user) {
    this.users.set(user.id, user);
  }

  getById(id) {
    return this.users.get(id);
  }

  // Implementar otros métodos como update, delete, etc.
}

// Implementación de repositorio para base de datos
class DatabaseUserRepository extends IRepository {
  constructor() {
    super();
    // Implementar la conexión y configuración de la base de datos
  }

  create(user) {
    // Implementar la lógica para almacenar el usuario en la base de datos
  }

  getById(id) {
    // Implementar la lógica para obtener el usuario de la base de datos por ID
  }

  // Implementar otros métodos como update, delete, etc.
}

// Clase UserService que utiliza un repositorio para acceder a los datos
class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  addUser(user) {
    this.repository.create(user);
  }

  getUserById(id) {
    return this.repository.getById(id);
  }

  // Otros métodos como updateUser, deleteUser, etc.
}

// Ejemplo de uso
const userRepository = new InMemoryUserRepository(); // Cambiar por `new DatabaseUserRepository()` para usar base de datos
const userService = new UserService(userRepository);

const user = { id: 1, name: "Alice" };
userService.addUser(user);
console.log(userService.getUserById(1)); // { id: 1, name: 'Alice' }