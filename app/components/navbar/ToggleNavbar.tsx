"use client";
import useResponsive from "@/src/hooks/useResponsive";
import { HamburgerIcon } from "@/src/theme/overrides/CustomIcons";
import { Fab } from "../mui";

type ToggleNavbarProps = {
  onOpenSidebar: () => void;
};

function ToggleNavbar({ onOpenSidebar }: ToggleNavbarProps) {
  const isDesktop = useResponsive("up", "lg");
  if (isDesktop) return <></>;
  return (
    <Fab
      color="primary"
      aria-label="omen menu"
      onClick={onOpenSidebar}
      className="fixed bottom-2 right-2 w-10 h-10"
    >
      <HamburgerIcon className="w-5" />
    </Fab>
  );
}

export default ToggleNavbar;
