import sdk from "./sdk";

// SDK. There are two events that you can listen to: 'message' and 'typing'.
// You can subscribe to these events using the `subscribe` method.
// You can also unsubscribe from these events using the `unSubscribe` method.

// Your task is to create a chat application that displays messages, input and typing notifications.
// The application should display messages, name of user, and avatar (use the firs letter for it).
// Name of user should be displayed on top of firs message.
// Avatar should be displayed on the left side of the last message.

// Above the input field, there should be a typing notification that displays the name of the user who is typing.
// This notification should be displayed 8 seconds after event triggered. After 8 seconds, the notification should disappear.
// If the user is typing again, the timer should reset.
// If 2 users are typing, the notification should display the names of both users with comma.
// If 3 or more users are typing, the notification should display "Several people are typing...".

export function App() {
  return <div></div>;
}

export default App;
