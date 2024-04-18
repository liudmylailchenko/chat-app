import styled from "@emotion/styled";
import { FormLabel, Paper } from "@mui/material";
import { Avatar } from "./Avatar";

type MessageProps = {
  message: string;
  user: string;
  hasAvatar?: boolean;
  hasUserName?: boolean;
};

export const Message = ({
  message,
  user,
  hasAvatar,
  hasUserName,
}: MessageProps) => {
  return (
    <MessageContainer>
      {hasAvatar && <Avatar user={user} />}
      <Paper
        sx={{
          width: 300,
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
        elevation={3}
      >
        {hasUserName ? (
          <FormLabel sx={{ fontSize: "12px" }}>{user}</FormLabel>
        ) : null}
        {message}
      </Paper>
    </MessageContainer>
  );
};

const MessageContainer = styled("div")`
  display: flex;
  gap: 10px;
  align-items: flex-end;
  justify-content: flex-end;
`;
