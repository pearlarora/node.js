// Creating Custom Events - User posts on Social Media
 
// 1. Import the events module
import * as Events from "events";

// 2. Create a class
// EventEmitter class is extended so that methods can be emitted as events
export class UserEvents extends Events.EventEmitter {
  createPost(content) {
    // This method will emit as an event
    console.log("Post is created");

    // Emit the event - this statement will call all the event listeners synchronously
    this.emit("postCreated", content); // Give the event name, like here it is "postCreated"
  }
}
