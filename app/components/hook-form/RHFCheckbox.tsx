// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

// ----------------------------------------------------------------------

type RHFCheckboxPropTypes = {
  name: string;
  label: string;
};

export function RHFCheckbox({ name, label, ...other }: RHFCheckboxPropTypes) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      }
      label={label}
      {...other}
    />
  );
}

// ----------------------------------------------------------------------

// type RHFMultiCheckboxPropTypes = {
//   name: PropTypes.string,
//   options: PropTypes.arrayOf(PropTypes.string),
// };

// export function RHFMultiCheckbox({ name, options, ...other }) {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => {
//         const onSelected = (option) =>
//           field.value.includes(option) ? field.value.filter((value) => value !== option) : [...field.value, option];

//         return (
//           <FormGroup>
//             {options.map((option) => (
//               <FormControlLabel
//                 key={option}
//                 control={
//                   <Checkbox
//                     checked={field.value.includes(option)}
//                     onChange={() => field.onChange(onSelected(option))}
//                   />
//                 }
//                 label={option}
//                 {...other}
//               />
//             ))}
//           </FormGroup>
//         );
//       }}
//     />
//   );
// }
