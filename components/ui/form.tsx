import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

/**
 * A higher-order component that wraps the Controller component from react-hook-form with a FormFieldContext provider.
 * @param {ControllerProps<TFieldValues, TName>} props - The props object containing all properties for the Controller component.
 * @returns {JSX.Element} A FormFieldContext provider wrapping a Controller component.
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

/**
 * Custom hook for managing form field state and context
 * @returns {Object} An object containing form field properties and state
 * @returns {string} id - The ID of the form item
 * @returns {string} name - The name of the form field
 * @returns {string} formItemId - The ID of the form item element
 * @returns {string} formDescriptionId - The ID of the form item description element
 * @returns {string} formMessageId - The ID of the form item message element
 * @returns {Object} fieldState - The current state of the form field
 * @throws {Error} Throws an error if used outside of a FormField component
 */
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
/**
 * A higher-order component that provides a FormItem context and renders a div with custom className and props.
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional CSS classes to apply to the div.
 * @param {React.Ref} ref - React ref object for the div element.
 * @returns {React.ReactElement} A div wrapped in a FormItemContext.Provider.
 */
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
/**
 * A functional component that renders a Label with form field integration.
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS class names for the Label
 * @param {React.Ref} ref - The ref to be forwarded to the Label component
 * @returns {React.ReactElement} A Label component with applied styling and form field integration
 */
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  /**
   * A higher-order component that enhances a Slot component with form field functionality.
   * @param {Object} props - The props object spread to the Slot component.
   * @param {React.Ref} ref - The ref object for the Slot component.
   * @returns {React.Component} A Slot component with additional form field attributes.
   */
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
/**
 * A React component that renders a paragraph element with form description styling.
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional CSS class names to apply to the paragraph.
 /**
  * Renders a form message component, typically used for displaying error messages or other form-related information.
  * @param {Object} props - The component props.
  * @param {string} [props.className] - Additional CSS classes to apply to the component.
  * @param {React.ReactNode} props.children - The content to be displayed in the message.
  * @param {React.Ref} ref - A ref to be attached to the rendered paragraph element.
  * @returns {React.ReactElement|null} A paragraph element containing the message, or null if there's no content to display.
  */
 * @param {React.Ref} ref - React ref object for the paragraph element.
 * @returns {React.ReactElement} A styled paragraph element for form descriptions.
 */
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
