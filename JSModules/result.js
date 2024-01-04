// Importing a module - CommonJS
// const arithmeticModule = require("./CommonJS.js");

// Importing a module - ES6 (ES6 doesn't support 'require' keyword)
import * as arithmeticModule from "./ES6.js";
// import {sum, num} from "./ES6.js";  // By doing this we can use the functions directly

// Call sum function
const result = arithmeticModule.sum(20, 30);
console.log(result);
console.log(arithmeticModule.num);  // ES6 
