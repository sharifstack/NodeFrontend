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
import { Switch } from "@/components/ui/switch";

import {
  useCreateSingleVariant,
  useGetAllBrand,
  useGetAllCategories,
} from "../../../hooks/api";

/* =========================
   ZOD SCHEMA
========================= */
const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),

  category: z.string().min(1),
  subCategory: z.string().min(1),
  brand: z.string().min(1),

  sku: z.string().min(1),

  varientType: z.literal("singleVarient"),

  unit: z.enum(["Piece", "Kg", "Gram", "Custom"]),
  groupUnit: z.enum(["Box", "Packet", "Dozen", "Custom"]).optional(),

  retailPrice: z.coerce.number(),
  wholesalePrice: z.coerce.number(),
  stockQuantity: z.coerce.number(),

  image: z.array(z.instanceof(File)).min(1),

  isActive: z.boolean(),
});

/* =========================
   COMPONENT
========================= */
const CreateSingleVariant = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      subCategory: "",
      brand: "",
      sku: "",
      unit: "Piece",
      groupUnit: undefined,
      retailPrice: 0,
      wholesalePrice: 0,
      stockQuantity: 0,
      varientType: "singleVarient",
      image: [],
      isActive: true,
    },
  });

  const { data: categoryData, isPending: categoryPending } =
    useGetAllCategories();
  const { data: brandData, isPending: brandPending } = useGetAllBrand();
  const singleVarint = useCreateSingleVariant();
  const [subCategoryList, setSubCategoryList] = useState([]);

  const selectedCategoryId = form.watch("category");
  const selectedUnit = form.watch("unit");

  useEffect(() => {
    if (!selectedCategoryId || !categoryData?.data) {
      setSubCategoryList([]);
      return;
    }

    const selectedCategory = categoryData.data.find(
      (item) => item._id === selectedCategoryId,
    );

    setSubCategoryList(selectedCategory?.subCategory || []);
    form.setValue("subCategory", "");
  }, [selectedCategoryId, categoryData]);

  const onSubmit = (values) => {
    console.log(values);
    singleVarint.mutate(values);
  };

  return (
    <div className="max-w-5xl mx-auto my-2">
      <Card className="rounded-2xl  shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            Create Single Variant Product
          </CardTitle>
          <CardDescription>
            Add product details, pricing, stock, and images
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name & SKU */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Category / SubCategory / Brand */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category */}
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

                {/* SubCategory */}
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
                            <SelectValue
                              placeholder={
                                !selectedCategoryId
                                  ? "Select category first"
                                  : "Select Sub Category"
                              }
                            />
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

                {/* Brand */}
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={brandPending}
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

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["retailPrice", "wholesalePrice", "stockQuantity"].map(
                  (name) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{name}</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ),
                )}
              </div>

              {/* Unit & Group Unit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Piece">Piece</SelectItem>
                          <SelectItem value="Kg">Kg</SelectItem>
                          <SelectItem value="Gram">Gram</SelectItem>
                          <SelectItem value="Custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="groupUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Unit</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select group unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Box">Box</SelectItem>
                          <SelectItem value="Packet">Packet</SelectItem>
                          <SelectItem value="Dozen">Dozen</SelectItem>
                          <SelectItem value="Custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Images */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        onChange={(e) =>
                          field.onChange(Array.from(e.target.files || []))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Active */}
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between border p-4 rounded-lg">
                    <FormLabel>Active</FormLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full py-6 text-lg">
                Create Product Variant
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSingleVariant;
