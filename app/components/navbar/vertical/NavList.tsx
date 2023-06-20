"use client";
import { usePathname } from "next/navigation";
import { NavItem } from "@/public/types";
import { getActive } from "..";
import { NavItemRoot } from "./NavItem";

type NavListRootType = {
  isCollapse: boolean;
  list: NavItem;
};
export function NavListRoot({ list, isCollapse }: NavListRootType) {
  const pathname = usePathname();
  const active = getActive(list.path, pathname);
  const hasChildren = list.children;
  if (hasChildren) {
    return <></>;
  }

  return <NavItemRoot item={list} active={active} isCollapse={isCollapse} />;
}
