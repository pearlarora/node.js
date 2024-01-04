// Asynchronous Operations - Non Blocking Code - Assigned to the Threads in the Thread Pool

// Import the fs module
const fs = require("fs");

// // Write data or Create a new file
// fs.writeFile("data.txt", "My name is Pearl Arora.", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Written to data.txt file");
//   }
// });

// // Appending to a file
// fs.appendFile(
//   "data.txt",
//   "\nI love to code. This is my first time doing this course.",
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Updated the data.txt file");
//     }
//   }
// );

// Read the file
fs.readFile("data.txt", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data.toString());
  }
});

// Delete a file
fs.unlink("data.txt", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("File has been deleted");
  }
});

console.log("Performing some other operations");
