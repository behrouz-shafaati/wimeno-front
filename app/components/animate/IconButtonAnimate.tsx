import { forwardRef, ReactNode } from "react";
// @mui
import { Box, IconButton } from "@mui/material";

// ----------------------------------------------------------------------
type IconButtonAnimateProps = {
  children: ReactNode;
  color:
    | "inherit"
    | "default"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error";
  size: "small" | "medium" | "large";
  onClick: () => void;
};
const IconButtonAnimate = forwardRef<any, any>(
  ({ children, size = "medium", ...other }, ref) => (
    <AnimateWrap>
      <IconButton size={size} ref={ref} {...other}>
        {children}
      </IconButton>
    </AnimateWrap>
  )
);

IconButtonAnimate.displayName = "IconButtonAnimate";

export default IconButtonAnimate;

// ----------------------------------------------------------------------

type AnimateWrapTypes = {
  children: ReactNode;
};

function AnimateWrap({ children }: AnimateWrapTypes) {
  return (
    <div
      className="inline-flex transform transition duration-300 hover:scale-105"
      // variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
    >
      {children}
    </div>
  );
}
