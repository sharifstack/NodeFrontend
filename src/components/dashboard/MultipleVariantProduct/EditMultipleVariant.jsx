"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";

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
import { Separator } from "@/components/ui/separator";

import {
  useEditSingleVariant,
  useGetAllBrand,
  useGetAllCategories,
  useOneSingleVariant,
} from "../../../hooks/api";

import FullScreenLoader from "../../ui/FullScreenLoader";
import ErrorPage from "../../pages/ErrorPage";

/* =========================
   ZOD SCHEMA (SAME AS CREATE)
========================= */
const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),

  category: z.string().min(1),
  subCategory: z.string().min(1),
  brand: z.string().min(1),

  manufactureCountry: z.string().optional(),
  warrantyInformation: z.string().optional(),
  warrantyexpires: z.string().optional(),
  shippingInformation: z.string().optional(),

  varientType: z.literal("multipleVarient"),
});

/* =========================
   COMPONENT
========================= */
const EditMultipleVariant = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, refetch } = useOneSingleVariant(slug);

  const editMultipleVariant = useEditSingleVariant();

  const { data: categoryData } = useGetAllCategories();
  const { data: brandData } = useGetAllBrand();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      subCategory: "",
      brand: "",
      manufactureCountry: "",
      warrantyInformation: "",
      warrantyexpires: "",
      shippingInformation: "",
      varientType: "multipleVarient",
    },
  });

  /* =========================
     SET DEFAULT VALUES
  ========================= */
  useEffect(() => {
    if (data?.data) {
      const p = data.data;

      form.reset({
        name: p.name || "",
        description: p.description || "",
        category: p.category?._id || "",
        subCategory: p.subCategory?._id || "",
        brand: p.brand?._id || "",
        manufactureCountry: p.manufactureCountry || "",
        warrantyInformation: p.warrantyInformation || "",
        warrantyexpires: p.warrantyexpires
          ? p.warrantyexpires.split("T")[0]
          : "",
        shippingInformation: p.shippingInformation || "",
        varientType: "multipleVarient",
      });
    }
  }, [data]);

  if (isPending) return <FullScreenLoader show />;

  if (isError) {
    return (
      <ErrorPage
        title="Failed to load product"
        description="Please try again later."
        onRetry={refetch}
      />
    );
  }

  const onSubmit = (values) => {
    editMultipleVariant.mutate({
      slug,
      values,
    });
  };

  return (
    <div className="max-w-5xl mx-auto my-6">
      <Card className="rounded-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            Edit Multiple Variant Product
          </CardTitle>
          <CardDescription>Update base product information</CardDescription>
        </CardHeader>

        <Separator />

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pt-6"
            >
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

              {/* Category / Sub / Brand */}
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
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Sub Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryData?.data
                            ?.find((c) => c._id === form.watch("category"))
                            ?.subCategory?.map((sub) => (
                              <SelectItem key={sub._id} value={sub._id}>
                                {sub.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
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
                    </FormItem>
                  )}
                />
              </div>

              {/* Extra Info */}
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
                    <Input type="date" {...field} />
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
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(EditMultipleVariant);
