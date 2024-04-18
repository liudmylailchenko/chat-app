import MuiAvatar, { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";

interface AvatarProps extends MuiAvatarProps {
  user: string;
}
export const Avatar = ({ user }: AvatarProps) => {
  return <MuiAvatar>{user[0]}</MuiAvatar>;
};
