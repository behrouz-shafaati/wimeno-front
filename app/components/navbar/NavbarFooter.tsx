import useAuth from "@/src/hooks/useAuth";
import { useSendLogoutMutation } from "@/src/redux/api/authApiSlice";
import { PATH_PAGE } from "@/src/routes/paths";
import { Button, List, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { ICONS } from "./NavConfig";
import {
  ListItemIconStyle,
  ListItemStyle,
  ListItemTextStyle,
} from "./vertical/style";

type NavbarFooterType = {
  isCollapse: boolean;
};

function NavbarFooter({ isCollapse, ...other }: NavbarFooterType) {
  const { user, isAuthenticated } = useAuth();
  const [sendLogout, { isLoading: isLoadingLogout, error: errorLogout }] =
    useSendLogoutMutation();
  const renderContent = (
    <>
      <ListItemStyle>
        <ListItemIconStyle>{ICONS.night}</ListItemIconStyle>
        <ListItemTextStyle
          disableTypography
          primary="Switch Mode"
          isCollapse={isCollapse}
        />
      </ListItemStyle>

      {isAuthenticated && (
        <ListItemStyle onClick={() => sendLogout({})}>
          <ListItemIconStyle>{ICONS.logout}</ListItemIconStyle>
          <ListItemTextStyle
            disableTypography
            primary="Logout"
            isCollapse={isCollapse}
          />
        </ListItemStyle>
      )}
    </>
  );

  const CreateMenuButton = (
    <Stack
      spacing={3}
      sx={{
        px: 5,
        pb: 5,
        mt: 10,
        width: 1,
        textAlign: "center",
        display: "block",
      }}
    >
      <Link href={PATH_PAGE.shop.register}>
        <Button rel="noopener" variant="contained">
          Create Menu
        </Button>
      </Link>
    </Stack>
  );
  return (
    <div {...other}>
      <List disablePadding sx={{ px: 2 }}>
        {renderContent}
      </List>
      {!isCollapse && CreateMenuButton}
    </div>
  );
}

export default NavbarFooter;
