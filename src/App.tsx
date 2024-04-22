import React from 'react'

import sdk from "./sdk";

import styled from "@emotion/styled";

// SDK. There are two events that you can listen to: 'message' and 'typing'.
// You can subscribe to these events using the `subscribe` method.
// You can also unsubscribe from these events using the `unSubscribe` method.

// Your task is to create a chat application that displays messages, input and typing notifications.
// The application should display messages, name of user, and avatar.
// Name of user should be displayed on top of first message.
// Avatar should be displayed on the left side of the last message.

// Above the input field, there should be a typing notification that displays the name of the user who is typing.
// This notification should be displayed 5 seconds after event triggered. After 5 seconds, the notification should disappear.
// If the user is typing again, the timer should reset.
// If 2 users are typing, the notification should display the names of both users with comma.
// If 3 or more users are typing, the notification should display "Several people are typing...".

// Users are uniq

interface Typing {
  user: string;
};

interface Message {
  user: string;
  message: string;
}

export function App() {
  // sdk.subscribe('typing', (data: Typing) => {})
  return <div></div>;
}

export default App;
