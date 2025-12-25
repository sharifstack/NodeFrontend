"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateSubCategory, useGetAllCategories } from "../../../hooks/api";

/* =========================
   Zod Schema
========================= */
const formSchema = z.object({
  name: z.string().min(2, "Sub-category name is required"),
  category: z.string().min(1, "Category is required"),
});

/* =========================
   Demo Category Data
========================= */
const categories = [
  { id: "68c18e42593130f53af6071e", name: "Mobile" },
  { id: "68c18e42593130f53af6071f", name: "Laptop" },
  { id: "68c18e42593130f53af60720", name: "Accessories" },
];

const SubCategory = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  const { data, isPending, isError, error, refetch } = useGetAllCategories();
  const createSubCategory = useCreateSubCategory();
  if (isPending) return <div>Loading... {isPending}</div>;
  if (isError) {
    console.log(error);
    return <div>Error loading categories</div>;
  }
  function onSubmit(values) {
    createSubCategory.mutate(values);
    // Call your API to create subcategory
  }
  return (
    <div className="w-1/2 mx-auto my-[15vh]">
      <Card className="shadow-2xl rounded-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-semibold">
            Create Sub Category
          </CardTitle>
          <CardDescription>
            Add a new sub-category under an existing category
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Sub-category name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub-category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Xiaomi v1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category select */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {data?.data?.map((cat) => (
                          <SelectItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create Sub Category
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubCategory;
