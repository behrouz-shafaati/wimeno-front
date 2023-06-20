// hooks
import useAuth from "@/src/hooks/useAuth";
// utils
import createAvatar from "@/src/utils/createAvatar";
//
import Avatar from "./Avatar";

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();
  const data = createAvatar(user?.name);
  return (
    <Avatar
      src={user?.image?.url}
      alt={user?.displayName}
      color={user?.image?.url ? "default" : data.color}
      {...other}
    >
      {data.name}
    </Avatar>
  );
}
