import { LoadingButton } from "@/app/components/mui";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { auth } from "@/src/firebase/app";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useFirebaseLoginMutation } from "@/src/redux/api/authApiSlice";

const SignInWithProvider: React.FC = () => {
  const [signInWithGoogle, user, loading, fbError] = useSignInWithGoogle(auth);
  const [firebaseLogin] = useFirebaseLoginMutation();
  useEffect(() => {
    if (user)
      (async () => {
        const idTokens = await user.user.getIdToken(true);
        if (user) console.log("idTokens:", idTokens);
        if (user) firebaseLogin({ idTokens });
      })();
  }, [user]);
  return (
    <div>
      <LoadingButton
        fullWidth
        size="large"
        type="button"
        variant="outlined"
        loading={loading}
        onClick={() => signInWithGoogle()}
        startIcon={
          <Image
            alt="google"
            src="/icons/flat-color-icons_google.svg"
            width={30}
            height={30}
          />
        }
      >
        Sign in with Google
      </LoadingButton>
      {fbError && <p>{fbError.message}</p>}
    </div>
  );
};
export default SignInWithProvider;
