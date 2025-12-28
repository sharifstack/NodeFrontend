import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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
import { useCreateBrand } from "../../../hooks/api";
import FullScreenLoader from "../../ui/FullScreenLoader";
import ErrorPage from "../../pages/ErrorPage";

/* =========================
   Zod Schema
========================= */
const formSchema = z.object({
  name: z.string().min(2, "Brand name is required"),
  since: z
    .string()
    .regex(/^\d{4}$/, "Enter a valid year")
    .refine(
      (year) =>
        Number(year) >= 1900 && Number(year) <= new Date().getFullYear(),
      "Year must be realistic"
    ),
  image: z
    .instanceof(File, { message: "Brand image is required" })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
});

const CreateBrand = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      since: "",
      image: undefined,
    },
  });

  const createBrand = useCreateBrand();

  // pending state
  if (createBrand.isPending) {
    return (
      <div>
        <FullScreenLoader show={true} />
      </div>
    );
  }

  //error state
  if (createBrand.isError) {
    return (
      <div>
        <ErrorPage
          title="Failed to create brand"
          description={createBrand.error?.response?.data?.message}
        />
      </div>
    );
  }

  const onSubmit = (values) => {
    createBrand.mutate(values);
    // later → mutate(values)
  };

  return (
    <div className="w-1/2 mx-auto my-[15vh]">
      <Card className="shadow-2xl rounded-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-semibold">Create Brand</CardTitle>
          <CardDescription>
            Add a new brand with logo and founding year
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Brand Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Mi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Since Year */}
              <FormField
                control={form.control}
                name="since"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Since</FormLabel>
                    <FormControl>
                      <Input placeholder="2001" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Brand Image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Image</FormLabel>
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

              <Button type="submit" className="w-full">
                Create Brand
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBrand;
