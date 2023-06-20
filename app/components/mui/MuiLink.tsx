"use client";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { ReactNode } from "react";

const LinkStyled = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

type LinkProps = {
  children: ReactNode;
  href: string;
};

function MuiLink({ children, href, ...others }: LinkProps) {
  return (
    <LinkStyled href={href} style={{ textDecoration: "none" }} {...others}>
      {children}
    </LinkStyled>
  );
}

export default MuiLink;
