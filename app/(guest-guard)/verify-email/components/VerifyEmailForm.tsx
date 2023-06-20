"use client";
import * as Yup from "yup";

import { useVerifyEmailMutation } from "@/src/redux/api/authApiSlice";

import { Button, LoadingButton } from "@/app/components/mui";
import FormProvider from "@/app/components/hook-form/FormProvider";
import RHFTextField from "@/app/components/hook-form/RHFTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
import MuiLink from "@/app/components/mui/MuiLink";
import { PATH_PAGE } from "@/src/routes/paths";

export default function VerifyEmailForm() {
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [verifyEmail, { data, isLoading, isError, isSuccess, error }] =
    useVerifyEmailMutation();
  const schema = Yup.object().shape({
    verifyCode: Yup.string().required("Verify code is required."),
  });

  const defaultValues = {
    verifyCode: "",
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
    verifyEmail({ ...data, email: email });
  };

  useEffect(() => {
    if (isError && error) {
      if ("status" in error) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg =
          "data" in error ? (error as any).data.msg : "Error in operation #3";
        enqueueSnackbar(errMsg, { variant: "error" });
      }
    }
    if (data) {
      console.log("Response:", verifyEmail);
    }
  }, [isLoading]);

  return !isSuccess ? (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <p>
        Email verification code sent to <b>{searchParams.get("email")}</b>
      </p>
      <section className="flex flex-col gap-3">
        <RHFTextField name="verifyCode" label="Verify Code" />
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
  ) : (
    <section>
      Your account has been activated. Please login:{" "}
      <MuiLink href={PATH_PAGE.user.login}>Login</MuiLink>
    </section>
  );
}
