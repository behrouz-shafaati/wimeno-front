import { forwardRef, ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import { Avatar as MUIAvatar } from "@mui/material";

// ----------------------------------------------------------------------
type AvatarProps = {
  children: ReactNode;
  sx: object;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error";
};

const Avatar = forwardRef(
  ({ color = "default", children, sx, ...other }: any, ref) => {
    const theme: any = useTheme();

    if (color === "default") {
      return (
        <MUIAvatar ref={ref} sx={sx} {...other}>
          {children}
        </MUIAvatar>
      );
    }

    return (
      <MUIAvatar
        ref={ref}
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
          ...sx,
        }}
        {...other}
      >
        {children}
      </MUIAvatar>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
