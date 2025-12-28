import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateCategory } from "../../hooks/api";
import FullScreenLoader from "../ui/FullScreenLoader";
import ErrorPage from "../pages/ErrorPage";

/* =========================
   Zod Schema
========================= */
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),

  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
});

export function CreateCategory() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const createCategory = useCreateCategory();

  async function onSubmit(values) {
    createCategory.mutate(values);
  }

  // pending state
  if (createCategory.isPending) {
    return (
      <div>
        <FullScreenLoader show={true} />
      </div>
    );
  }

  //error state
  if (createCategory.isError) {
    return (
      <div>
        <ErrorPage
          title="Failed to create category"
          description={createCategory.error?.response?.data?.message}
        />
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-1/2 border rounded-2xl shadow-lg p-20 mx-auto my-[20vh]"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Phones" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Create Category
          </Button>
        </form>
      </Form>
    </>
  );
}
