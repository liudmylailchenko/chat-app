import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./components/Input";
import sdk from "./sdk";
import { Message } from "./components/Message";

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

const RESET_TIMEOUT = 5_000;

export function App() {
  const [userTyping, setUserTyping] = useState<{
    [key: string]: NodeJS.Timeout;
  }>({});

  const ref = useRef<HTMLDivElement>(null);

  const [messagesGroups, setMessagesGroups] = useState<
    { user: string; messages: string[] }[]
  >([]);

  const handleTyping = useCallback((data: { user: string }) => {
    setUserTyping((prev) => {
      clearTimeout(prev[data.user]);

      const timeout = setTimeout(() => {
        setUserTyping((current) => {
          const { [data.user]: _, ...rest } = current;
          return rest;
        });
      }, RESET_TIMEOUT);

      return {
        ...prev,
        [data.user]: timeout,
      };
    });
  }, []);

  const handleMessages = useCallback(
    (data: { user: string; message: string }) => {
      setMessagesGroups((prev) => {
        const index = prev.length - 1;

        if (prev.length > 0 && prev[index].user === data.user) {
          const clone = [...prev];
          clone.splice(index, 1, {
            ...prev[index],
            messages: [...prev[index].messages, data.message],
          });

          return clone;
        } else {
          return [
            ...prev,
            {
              user: data.user,
              messages: [data.message],
            },
          ];
        }
      });
    },
    [setMessagesGroups]
  );

  useEffect(() => {
    sdk.subscribe("typing", handleTyping);

    return () => {
      sdk.unSubscribe("typing");
      setUserTyping((users) => {
        Object.values(users).forEach(clearTimeout);
        return {};
      });
    };
  }, [handleTyping]);

  useEffect(() => {
    sdk.subscribe("message", handleMessages);

    return () => {
      sdk.unSubscribe("message");
    };
  }, [handleMessages]);

  const typingText = useMemo(() => {
    switch (Object.keys(userTyping).length) {
      case 0:
        return "";
      case 1:
        return `${Object.keys(userTyping).join(", ")} is typing ...`;
      case 2:
        return `${Object.keys(userTyping).join(", ")} are typing ...`;

      default:
        return "Several people are typing...";
    }
  }, [userTyping]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 100000;
    }
  }, [messagesGroups]);

  return (
    <Wrapper>
      <Container ref={ref}>
        {messagesGroups.map(({ user, messages }) =>
          messages.map((message, index) => (
            <Message
              key={user}
              message={message}
              user={user}
              hasUserName={index === 0}
              hasAvatar={index === messages.length - 1}
            />
          ))
        )}
      </Container>
      <InputContainer>
        <span>{typingText}</span>
        <Input />
      </InputContainer>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled("div")`
  margin: 20px 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
  gap: 16px;
`;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-end;
  height: 800px;
  overflow: auto;
  padding: 16px;
`;

const InputContainer = styled("div")`
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-end;
`;
