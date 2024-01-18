// Functions for getting all users, adding a user and confirming user login.

export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static getAllUsers() {
    return users;
  }

  static addUser(name, email, password) {
    let newUser = new UserModel(users.length + 1, name, email, password);
    users.push(newUser);
  }

  static checkUser(email, password) {
    const userRegistered = users.find(
      (user) => user.email === email && user.password === password
    );
    return userRegistered;
  }
}

let users = [];
