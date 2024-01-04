// Importing path module to include the path of files which are not in the same directory - to allow multi platform support
const path = require("path");
const fs = require("fs");

const filepath = path.join("src", "hello", "hello.txt");
const filepathResolve = path.resolve("src", "hello", "hello.txt"); // Gives the absolute path
console.log(filepath);
console.log(filepathResolve);
console.log(path.extname(filepathResolve));

const bufferpath = fs.readFileSync(filepathResolve, { encoding: "utf8" });
console.log("File content: \n" + bufferpath);
