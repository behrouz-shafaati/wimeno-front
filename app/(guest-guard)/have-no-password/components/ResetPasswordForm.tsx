"use client";
import * as Yup from "yup";

import { useRequestResetPasswordMutation } from "@/src/redux/api/authApiSlice";

import { LoadingButton } from "@/app/components/mui";
import FormProvider from "@/app/components/hook-form/FormProvider";
import RHFTextField from "@/app/components/hook-form/RHFTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import SetNewPasswordForm from "./SetNewPasswordForm";

export default function ResetPasswordForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [requestResetPassword, { data, isLoading, isError, isSuccess, error }] =
    useRequestResetPasswordMutation();
  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required."),
  });

  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    setError,
    getValues,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    requestResetPassword(data);
  };

  if (isError)
    return (
      <section>
        We are unable to fulfill this request for one of the following reasons:
        <ul>
          <li>There is no user with this email.</li>
          <li>The user account is inactive.</li>
          <li>
            A large number of requests in a limited period of time to reset the
            password.
          </li>
        </ul>
      </section>
    );
  return !isSuccess ? (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-col gap-3">
        <RHFTextField name="email" label="Email" />
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
    <SetNewPasswordForm email={getValues("email")} />
  );
}
