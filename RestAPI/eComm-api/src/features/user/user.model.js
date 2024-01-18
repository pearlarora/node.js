export default class UserModel {
  constructor(id, name, email, password, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  static getAll() {
    return users;
  }

  static signUp(name, email, password, type) {
    const newUser = new UserModel(
      users.length + 1,
      name,
      email,
      password,
      type
    );
    users.push(newUser);
    return newUser;
  }

  static signIn(email, password) {
    const user = users.find(
      (user) => user.email == email && user.password == password
    );
    return user;
  }
}

let users = [
  {
    id: 1,
    name: "Name1",
    email: "Email1",
    password: "Password1",
    type: "seller",
  },
];
