// Singleton
class MessagingApp {
  constructor() {
    if (!MessagingApp.instance) {
      this.users = new Map();
      MessagingApp.instance = this;
    }
    return MessagingApp.instance;
  }

  addUser(user) {
    this.users.set(user.id, user);
  }

  getUser(id) {
    return this.users.get(id);
  }
}

// Factory Method
class UserFactory {
  static createUser(id, name, notificationStrategy) {
    return new User(id, name, notificationStrategy);
  }
}

// Command
class SendMessageCommand {
  constructor(sender, receiver, message) {
    this.sender = sender;
    this.receiver = receiver;
    this.message = message;
  }

  execute() {
    this.receiver.receiveMessage(this.sender, this.message);
  }
}

// Observer
class User {
  constructor(id, name, notificationStrategy) {
    this.id = id;
    this.name = name;
    this.notificationStrategy = notificationStrategy;
    this.inbox = [];
  }

  receiveMessage(sender, message) {
    this.inbox.push({ sender, message });
    this.notificationStrategy.notify(this, sender, message);
  }
}

// Strategy
class NotificationStrategy {
  notify(user, sender, message) {
    throw new Error("This method must be overridden");
  }
}

class EmailNotification extends NotificationStrategy {
  notify(user, sender, message) {
    console.log(`Email: '${message}' sent from ${sender.name} to ${user.name}`);
  }
}

class SMSNotification extends NotificationStrategy {
  notify(user, sender, message) {
    console.log(`SMS: '${message}' sent from ${sender.name} to ${user.name}`);
  }
}

// Ejemplo de uso
const messagingApp = new MessagingApp();

const alice = UserFactory.createUser(1, "Alice", new EmailNotification());
const mau = UserFactory.createUser(2, "Mau", new SMSNotification());

messagingApp.addUser(alice);
messagingApp.addUser(mau);

const message = "Hello, mau!";
const sendMessageCommand = new SendMessageCommand(alice, mau, message);
sendMessageCommand.execute();

// Output:
// Email: 'Hello, mau!' sent from Alice to Bob