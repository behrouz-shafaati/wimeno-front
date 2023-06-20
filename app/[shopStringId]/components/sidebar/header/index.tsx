import React from "react";
import Icon from "@/app/components/Icon";
// components
import IconButton from "@/app/components/mui/IconButton";
import { ICONS } from "@/app/components/navbar/NavConfig";
import SidebarAccount from "../SidebarAccount";

function SidebarHeader() {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <IconButton icon={ICONS.service} />
      <IconButton icon={ICONS.post} />
      <IconButton icon={ICONS.menu} />
      <IconButton icon={ICONS.location} />
      <IconButton icon={ICONS.bell} badgeContent={4} />
    </div>
  );
}

export default SidebarHeader;
