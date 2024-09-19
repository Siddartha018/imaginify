import React from "react";
import { Control } from "react-hook-form";
import { z } from "zod";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";

import { formSchema } from "./TransformationForm";

type CustomFieldProps = {
  control: Control<z.infer<typeof formSchema>> | undefined;
  render: (props: { field: any }) => React.ReactNode;
  name: keyof z.infer<typeof formSchema>;
  formLabel?: string;
  className?: string;
};

/**
 * Renders a custom form field component with flexible input rendering
 * @param {Object} props - The component props
 * @param {Object} props.control - The form control object from react-hook-form
 * @param {Function} props.render - A function to render the custom input field
 * @param {string} props.name - The name of the form field
 * @param {string} [props.formLabel] - Optional label for the form field
 * @param {string} [props.className] - Optional CSS class name for styling
 * @returns {JSX.Element} A FormField component with custom input rendering
 */
export const CustomField = ({
  control,
  render,
  name,
  formLabel,
  className,
}: CustomFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      /**
       * Renders a form field with optional label, control, and message components
       * @param {Object} props - The props object
       * @param {Function} props.field - The field object from react-hook-form
       * @param {string} [props.className] - Optional CSS class name for the FormItem
       * @param {string} [props.formLabel] - Optional label text for the form field
       * @param {Function} props.render - Function to render the form control
       * @returns {JSX.Element} A composed form field with label, control, and message
       */
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel>{formLabel}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};