// Singleton
class TaskManager {
  constructor() {
    if (!TaskManager.instance) {
      this.tasks = [];
      TaskManager.instance = this;
    }
    return TaskManager.instance;
  }

  addTask(task) {
    this.tasks.push(task);
  }
}

// Factory Method
class TaskFactory {
  static createTask(name, description, priority, state) {
    return new Task(name, description, priority, state);
  }
}

// Command
class AssignTaskCommand {
  constructor(task, user) {
    this.task = task;
    this.user = user;
  }

  execute() {
    this.task.assignTo(this.user);
  }
}

// Observer
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  notify(task) {
    console.log(`Task '${task.name}' has been assigned to ${this.name}`);
  }
}

// Decorator
class Task {
  constructor(name, description, priority, state) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.state = state;
    this.user = null;
  }

  assignTo(user) {
    this.user = user;
    this.user.notify(this);
  }
}

// State
class TaskState {
  changeState(task) {
    throw new Error("This method must be overridden");
  }
}

class TodoState extends TaskState {
  changeState(task) {
    task.state = new InProgressState();
  }
}

class InProgressState extends TaskState {
  changeState(task) {
    task.state = new CompletedState();
  }
}

class CompletedState extends TaskState {
  changeState(task) {
    console.log("Task is already completed");
  }
}

// Ejemplo de uso
const taskManager = new TaskManager();

const todoState = new TodoState();
const user1 = new User(1, "Alice");
const user2 = new User(2, "Bob");

const task1 = TaskFactory.createTask("Task 1", "Description 1", "High", todoState);
const task2 = TaskFactory.createTask("Task 2", "Description 2", "Low", todoState);

taskManager.addTask(task1);
taskManager.addTask(task2);

const assignTask1Command = new AssignTaskCommand(task1, user1);
const assignTask2Command = new AssignTaskCommand(task2, user2);

assignTask1Command.execute();
assignTask2Command.execute();

task1.state.changeState(task1);
task1.state.changeState(task1);

/**
 * En este ejemplo:
Utilizamos el patrón Singleton para la clase TaskManager para asegurarnos de que solo haya una instancia de la aplicación en todo el programa.
Utilizamos el patrón Factory Method para crear instancias de la clase Task con diferentes estados iniciales.
Utilizamos el patrón Command para asignar tareas a los usuarios mediante la clase AssignTaskCommand.
Utilizamos el patrón Observer para que los usuarios sean notificados cuando una tarea les ha sido asignada. La clase User actúa como el observador que recibe las notificaciones.
Utilizamos el patrón Decorator para agregar comportamiento adicional a las tareas cuando se les asigna a un usuario
 */