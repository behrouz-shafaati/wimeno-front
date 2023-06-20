import { ReactNode } from "react";
import { FormProvider as Form } from "react-hook-form";

type FormProvider = {
  children: ReactNode;
  onSubmit: any;
  methods: any;
};

function FormProvider({ children, onSubmit, methods }: FormProvider) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}

export default FormProvider;
