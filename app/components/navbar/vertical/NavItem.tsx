import { NavItem } from "@/public/types";
import { styled } from "@mui/material";
import Link from "next/link";
import { ListItemIconStyle, ListItemStyle, ListItemTextStyle } from "./style";
//---------------------------------------------------------------------

type NavItemRootType = {
  active: boolean;
  open?: boolean;
  isCollapse: boolean;
  onOpen?: () => void;
  item: NavItem;
};
export function NavItemRoot({
  item,
  isCollapse,
  open = false,
  active,
  onOpen,
}: NavItemRootType) {
  const { title, path, icon, info, children } = item;

  const renderContent = (
    <>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemTextStyle
        disableTypography
        primary={title}
        isCollapse={isCollapse}
      />
    </>
  );
  return (
    <Link href={path} style={{ textDecoration: "unset" }}>
      <ListItemStyle activeRoot={active}>{renderContent}</ListItemStyle>
    </Link>
  );
}
