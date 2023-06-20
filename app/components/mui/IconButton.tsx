"use client";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { alpha, styled } from "@mui/material/styles";
import IconButtonMui from "@mui/material/IconButton";
import { ICON } from "@/src/config";
import { ReactNode } from "react";

export const IconStyle = styled("span")({
  minWidth: ICON.NAVBAR_ITEM,
  width: ICON.NAVBAR_ITEM,
  height: ICON.NAVBAR_ITEM,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": { width: "100%", height: "100%" },
});

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }: any) => ({
  "& .MuiBadge-badge": {
    right: 1,
    top: 4,
    padding: "0",
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.customShadows.primary,
  },
}));

const StyledIconButton = styled(IconButtonMui)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: 0,
  backgroundColor: alpha(
    theme.palette.primary.main,
    theme.palette.action.selectedOpacity
  ),
  ":hover": {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  },
}));

type IconButtonProps = {
  icon: ReactNode;
  badgeContent?: number;
};

export default function IconButton({ icon, badgeContent }: IconButtonProps) {
  const renderContent = badgeContent ? (
    <StyledBadge badgeContent={badgeContent} color="secondary">
      <IconStyle>{icon}</IconStyle>
    </StyledBadge>
  ) : (
    <IconStyle>{icon}</IconStyle>
  );
  return <StyledIconButton aria-label="cart">{renderContent}</StyledIconButton>;
}
