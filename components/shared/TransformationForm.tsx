"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { defaultValues } from "@/constants"
import { CustomField } from "./CustomField"

export const formSchema = z.object({
  title:z.string(),
  aspectRatio:z.string().optional(),
  color:z.string().optional(),
  prompt:z.string().optional(),
  publicId:z.string(),
})


/**
 * TransformationForm component for handling image transformation form
 * @param {Object} props - The component props
 * @param {string} props.action - The action to perform ('Update' or other)
 * @param {Object|null} [props.data=null] - The initial data for the form (optional)
 * @returns {JSX.Element} A form for image transformation
 */
const TransformationForm = ({action,data=null}:TransformationFormProps) => {
    const initialValues= data && action==='Update'?{
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
    }:defaultValues

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <CustomField control={form.control} name="title" formLabel="Image Title"
      /**
       * Renders an Input component with specific props and styling
       * @param {Object} field - The field object containing input properties
       * @returns {JSX.Element} A styled Input component
       */
      className="w-full" render={({field})=><Input {...field} className="input-field"/>} />
      <Button/>
    </form>
  </Form>
  )
}

export default TransformationForm