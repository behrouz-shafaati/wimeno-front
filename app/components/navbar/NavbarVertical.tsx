"use client";
// @mui
import { Box, Drawer, Stack, styled, useTheme } from "@mui/material";
// hooks
import useResponsive from "@/src/hooks/useResponsive";
import useCollapseDrawer from "@/src/hooks/useCollapseDrawer";
//config
import { NAVBAR } from "@/src/config";
// component
import Scrollbar from "../Scrollbar";
//
import { navConfig, navBottomConfig } from "./NavConfig";
import NavSectionVertical from "./vertical";
import NavbarFooter from "./NavbarFooter";
import cssStyles from "@/src/utils/cssStyles";
import { useState } from "react";
import NavbarAccount from "./NavbarAccount";
// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// ----------------------------------------------------------------------

type NavbarVerticalType = {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
};

function NavbarVertical({ isOpenSidebar, onCloseSidebar }: NavbarVerticalType) {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "lg");
  const {
    isCollapse,
    collapseClick,
    collapseHover,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <div
        className="w-full inline-flex flex-col pt-3 pb-2 px-4"
        style={{
          flexShrink: 0,
          ...(isCollapse && { alignItems: "center" }),
        }}
      >
        <NavbarAccount isCollapse={isCollapse} />
      </div>
      <NavSectionVertical navConfig={navConfig} isCollapse={isCollapse} />
      <div className="w-full">
        <NavbarFooter isCollapse={isCollapse} />
      </div>
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse
            ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
            : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: "absolute",
        }),
      }}
    >
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: "dashed",
              bgcolor: "background.default",
              transition: (theme) =>
                theme.transitions.create("width", {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: (theme: any) => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}

export default NavbarVertical;
