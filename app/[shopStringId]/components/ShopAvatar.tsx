"use client";
// utils
import createAvatar from "@/src/utils/createAvatar";
//
import Avatar from "@/app/components/Avatar";

// ----------------------------------------------------------------------

type ShopAvatarProps = {
  src?: string;
  alt: string;
  sx?: any;
};

export default function ShopAvatar({
  src = "W",
  alt,
  ...other
}: ShopAvatarProps) {
  return (
    <Avatar
      src={src}
      alt={alt}
      color={src ? "default" : createAvatar(alt).color}
      {...other}
    >
      {createAvatar(alt).name}
    </Avatar>
  );
}
