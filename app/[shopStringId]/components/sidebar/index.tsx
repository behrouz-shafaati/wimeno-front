import { SIDEBAR } from "@/src/config";
import { styled } from "@mui/material/styles";
import React from "react";
import SidebarHeader from "./header";

// ----------------------------------------------------------------------

const SidebarWrapper = styled("div")(({ theme }) => ({
  background: theme.palette.background.paper,
  position: "fixed",
  padding: 24,
  right: 0,
  top: 0,
  width: SIDEBAR.BASE_WIDTH,
  height: `100vh`,
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

// ----------------------------------------------------------------------

type SidebarProps = {};

function Sidebar({}: SidebarProps) {
  return (
    <SidebarWrapper>
      <SidebarHeader />
    </SidebarWrapper>
  );
}

export default Sidebar;
