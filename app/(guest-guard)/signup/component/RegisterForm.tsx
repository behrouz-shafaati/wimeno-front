"use client";
import * as Yup from "yup";

import { useRegisterMutation } from "@/src/redux/api/authApiSlice";

import { Button, LoadingButton } from "@/app/components/mui";
import FormProvider from "@/app/components/hook-form/FormProvider";
import RHFTextField from "@/app/components/hook-form/RHFTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function RegisterForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [
    register,
    { data: registerResponse, isLoading, isError, isSuccess, error },
  ] = useRegisterMutation();
  const RegisterSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    console.log("data:", data);
    register(data);
  };

  useEffect(() => {
    if (isError && error) {
      if ("status" in error) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg =
          "data" in error ? (error as any).data.msg : "Error in operation #1";
        enqueueSnackbar(errMsg, { variant: "error" });
      }
    }
    if (registerResponse?.redirect) {
      redirect(registerResponse.redirect);
    }
  }, [isLoading]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-col gap-3">
        <RHFTextField name="email" label="Email" />
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
  );
}
