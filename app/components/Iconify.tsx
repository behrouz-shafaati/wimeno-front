import PropTypes from "prop-types";
// icons
import { Icon } from "@iconify/react";
// @mui
// import { Box } from '@mui/material';

// ----------------------------------------------------------------------

type IconifyType = {
  icon: string;
  width?: number;
  height?: number;
  sx?: any;
};

export default function Iconify({
  icon,
  width,
  height,
  ...other
}: IconifyType) {
  return <Icon icon={icon} width={width} height={height} {...other} />;
}
