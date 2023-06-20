"use client";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import FormProvider from "@/app/components/hook-form/FormProvider";
import RHFTextField from "@/app/components/hook-form/RHFTextField";

import { LoadingButton } from "@/app/components/mui";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "@/src/redux/api/authApiSlice";
import { setCredentials } from "@/src/redux/slice/authSlice";
import useAuth from "@/src/hooks/useAuth";
import { RHFCheckbox } from "@/app/components/hook-form/RHFCheckbox";
import MuiLink from "@/app/components/mui/MuiLink";

import { PATH_PAGE } from "@/src/routes/paths";
import SignInWithProvider from "./SignInWithProvider";
import { redirect } from "next/navigation";
import { useSnackbar } from "notistack";

export default function LoginForm() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [login, { data, isLoading: isSubmitting, isSuccess, error }] =
    useLoginMutation();
  const { user } = useAuth();
  // form validation rules
  const defaultValues = {
    username: "",
    password: "",
    remember: false,
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    remember: Yup.boolean(),
  });
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      login({
        email: data.username,
        password: data.password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(data);
    if (data && isSuccess) {
      if (data?.redirect) redirect(data.redirect);
      const { accessToken, user } = data;
      dispatch(setCredentials({ accessToken, user }));
    }
    if (!isSuccess && error) {
      const errMsg =
        "data" in error ? (error as any).data.msg : "Error in login";
      enqueueSnackbar(errMsg, { variant: "error" });
    }
  }, [data, error]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-col gap-3">
        <RHFTextField name="username" label="Email" />
        <RHFTextField name="password" label="Password" type="password" />
        <div className="flex items-center justify-between">
          <RHFCheckbox name="remember" label="Remember for 30 days" />
          <MuiLink href={PATH_PAGE.forgotPassword}>I have no password</MuiLink>
        </div>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Submit
        </LoadingButton>
        <SignInWithProvider />
      </section>
    </FormProvider>
  );
}
