import { useSelector } from "react-redux";

import { selectCurrentToken } from "@/src/redux/slice/authSlice";
// ----------------------------------------------------------------------

const useAuth = () => {
  const { token, user } = useSelector(selectCurrentToken);
  let isAuthenticated = false;
  let isInitialized = false;
  const method = "jwt";
  if (token) {
    isAuthenticated = true;
    isInitialized = true;

    return { user, isAuthenticated, isInitialized, method };
  }

  return { user: null, isAuthenticated, isInitialized, method };
};

export default useAuth;
