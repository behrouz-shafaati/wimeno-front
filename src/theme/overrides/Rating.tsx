//
import { StarIcon } from "./CustomIcons";

// ----------------------------------------------------------------------

const ICON_SMALL = { width: 12, height: 12 };
const ICON_LARGE = { width: 28, height: 28 };

export default function Rating(theme: any) {
  return {
    MuiRating: {
      defaultProps: {
        emptyIcon: <StarIcon />,
        icon: <StarIcon />,
      },

      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            opacity: 0.48,
          },
        },
        iconEmpty: { color: theme.palette.grey[500_48] },
        sizeSmall: { "& svg": { ...ICON_SMALL } },
        sizeLarge: { "& svg": { ...ICON_LARGE } },
      },
    },
  };
}