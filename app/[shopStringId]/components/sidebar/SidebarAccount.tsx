"use client";
import { useSnackbar } from "notistack";
import { useState } from "react";
// next
import NextLink from "next/link";
// import { useRouter } from 'next/router';
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Button,
} from "@mui/material";
// routes
import { PATH_AUTH } from "@/src/routes/paths";
// hooks
import useAuth from "@/src/hooks/useAuth";
// import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import MyAvatar from "@/app/components/MyAvatar";
import MenuPopover from "@/app/components/MenuPopover";
import { IconButtonAnimate } from "@/app/components/animate";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    linkTo: "/",
  },
  {
    label: "Profile",
    linkTo: "/",
  },
  {
    label: "Settings",
    linkTo: "/",
  },
];

// ----------------------------------------------------------------------

export default function SidebarAccount() {
  // const router = useRouter();

  const { user, isAuthenticated } = useAuth();

  // const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(null);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    try {
      // await logout();
      // router.replace(PATH_AUTH.login);
      // if (isMountedRef.current) {
      //   handleClose();
      // }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };
  if (!isAuthenticated)
    return (
      <>
        <NextLink href="/login">
          <Button variant="text" size="small">
            login/register
          </Button>
        </NextLink>
      </>
    );
  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open
            ? {
                "&:before": {
                  zIndex: 1,
                  content: "''",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  position: "absolute",
                  bgcolor: (theme: any) => alpha(theme.palette.grey[900], 0.8),
                },
              }
            : {}),
        }}
      >
        <MyAvatar />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </NextLink>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
