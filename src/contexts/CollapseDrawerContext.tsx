import { useMediaQuery, useTheme } from "@mui/material";
import { createContext, ReactNode, useEffect, useState } from "react";

// ----------------------------------------------------------------------

const initialState = {
  isCollapse: false,
  collapseClick: false,
  collapseHover: false,
  onToggleCollapse: () => {},
  onHoverEnter: () => {},
  onHoverLeave: () => {},
};

const CollapseDrawerContext = createContext(initialState);

// ----------------------------------------------------------------------

type CollapseDrawerProviderType = {
  children: ReactNode;
};

function CollapseDrawerProvider({ children }: CollapseDrawerProviderType) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [collapse, setCollapse] = useState({
    click: true,
    hover: false,
  });

  useEffect(() => {
    if (isMobile)
      setCollapse({
        click: false,
        hover: false,
      });
  }, [isMobile]);

  const handleToggleCollapse = () => {
    setCollapse({ ...collapse, click: !collapse.click });
  };

  const handleHoverEnter = () => {
    if (collapse.click) setCollapse({ ...collapse, hover: true });
  };

  const handleHoverLeave = () => {
    setCollapse({ ...collapse, hover: false });
  };
  return (
    <CollapseDrawerContext.Provider
      value={{
        isCollapse: collapse.click && !collapse.hover,
        collapseClick: collapse.click,
        collapseHover: collapse.hover,
        onToggleCollapse: handleToggleCollapse,
        onHoverEnter: handleHoverEnter,
        onHoverLeave: handleHoverLeave,
      }}
    >
      {children}
    </CollapseDrawerContext.Provider>
  );
}

export { CollapseDrawerProvider, CollapseDrawerContext };
