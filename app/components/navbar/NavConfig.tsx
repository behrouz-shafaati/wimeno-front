// routes
import { PATH_PAGE } from "@/src/routes/paths";
// components
import Icon from "../Icon";
import Label from "../Label";

// ----------------------------------------------------------------------

const ICONS: any = {
  plus: Icon("solar_add-circle-bold"),
  home: Icon("solar_home-angle-linear"),
  post: Icon("solar_posts-carousel-vertical-line-duotone"),
  saved: Icon("solar_heart-angle-linear"),
  history: Icon("solar_history-line-duotone"),
  login: Icon("solar_login-2-outline"),
  logout: Icon("solar_logout-2-linear"),
  light: Icon(""),
  night: Icon("solar_moon-linear"),
  bell: Icon("solar_bell-linear"),
  location: Icon("basil_location-question-outline"),
  user: Icon("solar_user-circle-linear"),
  menu: Icon("solar_menu-dots-square-broken"),
  service: Icon("fluent_service-bell-20-regular"),
  cart: Icon("solar_cart-broken"),
  google: Icon("flat-color-icons_google"),
  qr: Icon("uil_qrcode-scan"),
};

const navConfig = [
  {
    // subheader: "app",
    items: [
      { title: "Home", path: PATH_PAGE.home, icon: ICONS.home },
      { title: "Wall", path: PATH_PAGE.wall, icon: ICONS.post },
      { title: "Saved", path: PATH_PAGE.saved, icon: ICONS.saved },
      { title: "History", path: PATH_PAGE.history, icon: ICONS.history },
    ],
  },
];

const navBottomConfig = [
  {
    // subheader: "app",
    items: [
      { title: "Mode", path: "#", icon: ICONS.night },
      { title: "Lanquage", path: "#", icon: ICONS.saved },
      { title: "Login", path: PATH_PAGE.history, icon: ICONS.logout },
    ],
  },
];

export { ICONS, navConfig, navBottomConfig };
