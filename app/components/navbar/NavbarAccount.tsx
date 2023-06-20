import PropTypes from "prop-types";
// next
import NextLink from "next/link";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
// hooks
import useAuth from "@/src/hooks/useAuth";
// routes
import { PATH_PAGE } from "@/src/routes/paths";
// components
import MyAvatar from "../MyAvatar";
import { ICONS } from "./NavConfig";
import { ICON } from "@/src/config";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(
    theme.palette.grey[500],
    theme.palette.action.selectedOpacity
  ),
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

const ListItemIconStyle = styled("span")({
  minWidth: ICON.NAVBAR_ITEM,
  width: ICON.NAVBAR_ITEM,
  height: ICON.NAVBAR_ITEM,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": { width: "100%", height: "100%" },
});

// ----------------------------------------------------------------------

type NavbarAccountType = {
  isCollapse: boolean;
};

export default function NavbarAccount({ isCollapse }: NavbarAccountType) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated)
    return (
      <NextLink href={PATH_PAGE.user.login} passHref>
        <RootStyle
          sx={{
            ...(isCollapse && {
              bgcolor: "transparent",
            }),
          }}
        >
          <ListItemIconStyle>{ICONS.user}</ListItemIconStyle>

          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create("width", {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            <Typography variant="subtitle2" noWrap>
              Login/Register
            </Typography>
          </Box>
        </RootStyle>
      </NextLink>
    );

  return (
    // <NextLink href={PATH_PAGE.user.account} passHref>
    <RootStyle
      sx={{
        ...(isCollapse && {
          bgcolor: "transparent",
        }),
      }}
    >
      <MyAvatar />

      <Box
        sx={{
          ml: 2,
          transition: (theme) =>
            theme.transitions.create("width", {
              duration: theme.transitions.duration.shorter,
            }),
          ...(isCollapse && {
            ml: 0,
            width: 0,
          }),
        }}
      >
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
          {user?.role}
        </Typography>
      </Box>
    </RootStyle>
    // </NextLink>
  );
}
