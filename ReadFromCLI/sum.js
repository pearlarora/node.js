// Reading valuses from the terminal

// 1. Import readline
const readline = require("readline");

// 2. Configure an interface to connect the application to the terminal
const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 3. Read the values from the terminal
interface.question("Enter first number: ", (num1) => {
  interface.question("Enter second number: ", (num2) => {
    const sum = Number(num1) + Number(num2);
    console.log(sum);
  });
});
