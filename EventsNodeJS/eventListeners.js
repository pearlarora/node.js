// 1. Importing the UserEvents module
import { UserEvents } from "./userEvents.js";

// 2. Creating a new instance of UserEvents class
const userEvent = new UserEvents();

// 3. Defining Listener Methods - These will be called synchronously when the event is emitted
function saveToDatabase(content) {
  console.log("Content saved to database: " + content);
}
function sendNotifications() {
  console.log("Sent notification");
}
function updateTimeline() {
  console.log("Content updated on timeline");
}

// 4. Assigning the three event listeners for the postCreated event
userEvent.addListener("postCreated", saveToDatabase);
userEvent.addListener("postCreated", sendNotifications);
userEvent.addListener("postCreated", updateTimeline);
// userEvent.addListener("postCreated", (content) => { console.log("Another way to define event listeners);});

// 5. Creating a new post
// This function is called when the Create Post button is clicked on the UI
userEvent.createPost("This is my first post");
