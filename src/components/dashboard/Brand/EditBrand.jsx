import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEditBrand } from "../../../hooks/api";
import { useNavigate } from "react-router";

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
  image: z.instanceof(File).optional(),
});

const EditBrand = () => {
  // demo existing data (replace with API data)
  const [preview, setPreview] = useState("https://via.placeholder.com/150");
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Mi",
      since: "2001",
      image: undefined,
    },
  });

  const updateBrand = useEditBrand();

  const onSubmit = (values) => {
    updateBrand.mutate(values);
  };

  //handle back
  const handleBack = () => {
    navigate("/brand-list");
  };

  return (
    <div className="w-1/2 mx-auto my-[15vh]">
      <Card className="shadow-2xl rounded-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-semibold">Edit Brand</CardTitle>
          <CardDescription>Update brand details and logo</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Brand Logo Preview */}
              <div className="flex justify-center">
                <Avatar className="h-28 w-28">
                  <AvatarImage src={preview} />
                  <AvatarFallback>
                    {form.watch("name")?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

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

              {/* Since */}
              <FormField
                control={form.control}
                name="since"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Since</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Change Logo */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change Brand Logo (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                          if (file) {
                            setPreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="flex gap-3 items-center justify-center">
                <Button type="submit" className="w-1/2  cursor-pointer">
                  Update Brand
                </Button>
                <Button
                  onClick={handleBack}
                  type="button"
                  variant="outline"
                  className=" cursor-pointer w-1/4"
                >
                  Back
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBrand;
