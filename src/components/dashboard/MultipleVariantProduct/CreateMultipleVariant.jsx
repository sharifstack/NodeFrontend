"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  useCreateSingleVariant,
  useGetAllBrand,
  useGetAllCategories,
} from "../../../hooks/api";

import FullScreenLoader from "../../ui/FullScreenLoader";
import ErrorPage from "../../pages/ErrorPage";

/* =========================
   ZOD SCHEMA
========================= */
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description is required"),

  category: z.string().min(1),
  subCategory: z.string().min(1),
  brand: z.string().min(1),

  // tag: z.array(z.string()).default([]),
  manufactureCountry: z.string().optional(),
  warrantyInformation: z.string().optional(),
  warrantyexpires: z.string().optional(),
  shippingInformation: z.string().optional(),

  varientType: z.literal("multipleVarient"),
});

/* =========================
   COMPONENT
========================= */
const CreateMultipleVariant = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      subCategory: "",
      brand: "",
      // tag: [],
      manufactureCountry: "",
      warrantyInformation: "",
      warrantyexpires: "",
      shippingInformation: "",
      varientType: "multipleVarient",
    },
  });

  const { data: categoryData, isPending: categoryPending } =
    useGetAllCategories();
  const { data: brandData, isPending, isError, refetch } = useGetAllBrand();
  const createMultipleVarient = useCreateSingleVariant();

  const [subCategoryList, setSubCategoryList] = useState([]);

  const selectedCategoryId = form.watch("category");

  useEffect(() => {
    if (!selectedCategoryId || !categoryData?.data) {
      setSubCategoryList([]);
      return;
    }

    const selected = categoryData.data.find(
      (item) => item._id === selectedCategoryId,
    );

    setSubCategoryList(selected?.subCategory || []);
    form.setValue("subCategory", "");
  }, [selectedCategoryId, categoryData]);

  if (isPending) return <FullScreenLoader show />;

  if (isError) {
    return (
      <ErrorPage
        title="Failed to load data"
        description="Please try again"
        onRetry={refetch}
      />
    );
  }

  const onSubmit = (values) => {
    createMultipleVarient.mutate(values);
  };

  return (
    <div className=" w-full max-w-5xl mx-auto my-2">
      <Card className="rounded-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            Create Multiple Variant Product
          </CardTitle>
          <CardDescription>
            Base product info before adding variants
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category / SubCategory / Brand */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={categoryPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryData?.data?.map((cat) => (
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

                <FormField
                  control={form.control}
                  name="subCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub Category</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={!selectedCategoryId}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Sub Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subCategoryList.map((sub) => (
                            <SelectItem key={sub._id} value={sub._id}>
                              {sub.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Brand" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {brandData?.data?.map((brand) => (
                            <SelectItem key={brand._id} value={brand._id}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Extra Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="manufactureCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacture Country</FormLabel>
                      <Input {...field} />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag</FormLabel>
                      <Input
                        onChange={(e) =>
                          field.onChange(
                            e.target.value.split(",").map((t) => t.trim()),
                          )
                        }
                      />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="warrantyInformation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warranty Information</FormLabel>
                    <Textarea rows={3} {...field} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="warrantyexpires"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warranty Expiry Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shippingInformation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Information</FormLabel>
                    <Textarea rows={3} {...field} />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full py-6 text-lg">
                Create Base Product
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateMultipleVariant;
