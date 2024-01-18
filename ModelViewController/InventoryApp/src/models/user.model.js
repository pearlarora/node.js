export default class UserModel {
  constructor(_id, _name, _email, _password) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
  }

  static addUser(_name, _email, _password) {
    const newUser = new UserModel(users.length + 1, _name, _email, _password);
    users.push(newUser);
  }

  static checkUser(email, password) {
    const result = users.find(
      (user) => user.email == email && user.password == password
    );
    return result;
  }
}

let users = [];
