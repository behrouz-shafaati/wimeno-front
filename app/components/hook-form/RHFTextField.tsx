import { useFormContext, Controller } from "react-hook-form";

import { TextField } from "@/app/components/mui";
import { ControllerRender } from "@/public/types";

type RHCTextField = {
  name: string;
  label: string;
  type?: string;
};

function RHFTextField({ name, ...other }: RHCTextField) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }: ControllerRender) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}

export default RHFTextField;
