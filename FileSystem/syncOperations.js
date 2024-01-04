// Synchronous Operations - Blocking Code - Blocking the main thread

// Import the fs module
const fs = require("fs");

// Creating and/or Writing into a file (On rerun it will rewrite on top of the existing file)
try {
  fs.writeFileSync(
    "employee.txt",
    "Name: Pearl Arora, Age: 22, DOB: 11/12/2001\n"
  );
  console.log("Written to employee.txt file");
} catch (err) {
  console.log(err);
}

// Appending data to an existing file (It will also create a new file if it doesn't exist)
fs.appendFileSync(
  "employee.txt",
  "Name: Shivoy Arora, Age: 20, DOB: 11/08/2003\n"
);

// Read file content
console.log("Starting to read file content");
const buffer = fs.readFileSync("employee.txt", { encoding: "utf8" });
console.log("File content: \n" + buffer);

// Delete existing file
try {
  fs.unlinkSync("data.txt");
} catch (err) {
  console.log("File does not exist");
}

console.log("Performing some other operations");
