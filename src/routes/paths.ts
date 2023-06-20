// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS = "";
const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  verify: path(ROOTS_AUTH, "/verify"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
};

export const PATH_PAGE = {
  home: "/",
  wall: "/wall",
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  faqs: "/faqs",
  page404: "/404",
  page500: "/500",
  user: {
    account: "/account",
    login: "/login",
    signup: "/signup",
  },
  saved: "/saved",
  forgotPassword: "/have-no-password",
  history: "/history",
  shop: {
    register: "register-shop",
    home: (shopId: string) => `${shopId}`,
    wall: (shopId: string) => `${shopId}/wall`,
  },
};
