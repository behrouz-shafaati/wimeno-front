"use client";
import * as Yup from "yup";

import { useSetResetedPasswordMutation } from "@/src/redux/api/authApiSlice";

import { LoadingButton } from "@/app/components/mui";
import FormProvider from "@/app/components/hook-form/FormProvider";
import RHFTextField from "@/app/components/hook-form/RHFTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { setCredentials } from "@/src/redux/slice/authSlice";
import { useDispatch } from "react-redux";

type SetNewPasswordFormProps = {
  email: string;
};

export default function SetNewPasswordForm({ email }: SetNewPasswordFormProps) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [setResetedPassword, { data, isLoading, isError, isSuccess, error }] =
    useSetResetedPasswordMutation();
  const schema = Yup.object().shape({
    verifyCode: Yup.string().required("Verification code is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const defaultValues = {
    verifyCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    setResetedPassword({ ...data, email });
  };

  useEffect(() => {
    if (isError && error) {
      if ("status" in error) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg =
          "data" in error ? (error as any).data.msg : "Error in reset password";
        enqueueSnackbar(errMsg, { variant: "error" });
      }
    }
    if (isSuccess) {
      const { accessToken, user } = data;
      dispatch(setCredentials({ accessToken, user }));
    }
  }, [isLoading, isSuccess]);

  return (
    <>
      <p>
        Account ownership confirmation code has been sent to <b>{email}</b>. Use
        it to set the password.
      </p>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col gap-3">
          <RHFTextField name="verifyCode" label="Verification Code" />
          <RHFTextField name="password" label="Password" />
          <RHFTextField name="confirmPassword" label="Confirm Password" />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isLoading}
          >
            Submit
          </LoadingButton>
        </section>
      </FormProvider>
    </>
  );
}
