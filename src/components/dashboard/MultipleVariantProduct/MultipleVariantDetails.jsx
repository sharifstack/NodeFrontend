"use client";

import React from "react";
import { useParams, useNavigate } from "react-router";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { ArrowLeft } from "lucide-react";

import FullScreenLoader from "../../ui/FullScreenLoader";
import ErrorPage from "../../pages/ErrorPage";

import { useOneSingleVariant } from "../../../hooks/api";

/* =========================
   SMALL INFO CARD
========================= */
const InfoItem = ({ label, value }) => (
  <div className="rounded-lg border px-3 py-2 hover:shadow-sm transition">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-semibold truncate">{value ?? "N/A"}</p>
  </div>
);

const MultipleVariantDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError } = useOneSingleVariant(slug);

  if (isPending) return <FullScreenLoader show />;

  if (isError) {
    return (
      <ErrorPage
        title="Product not found"
        description="Unable to fetch multiple-variant product details."
      />
    );
  }

  const product = data?.data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* BACK */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card className="rounded-2xl shadow-xl min-h-[80vh] flex flex-col">
        {/* HEADER */}
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                {product?.name}
              </CardTitle>
              <CardDescription>Base SKU: {product?.sku}</CardDescription>
            </div>

            <Badge
              className={
                product?.isActive
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400"
              }
            >
              {product?.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-6 flex-1">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-4">
            {/* Images */}
            <div className="bg-muted/30 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-3">
                {product?.image?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={product?.name}
                    className="h-48 md:h-56 w-full object-cover rounded-xl border"
                  />
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="flex items-center gap-3 border rounded-xl p-3">
              <Avatar>
                <AvatarImage src={product?.brand?.image} />
                <AvatarFallback>
                  {product?.brand?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-muted-foreground">Brand</p>
                <p className="font-semibold text-sm">{product?.brand?.name}</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div className="space-y-4">
              {/* DESCRIPTION */}
              <div className="rounded-xl border p-4 bg-muted/20">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product?.description}
                </p>
              </div>

              <Separator />

              {/* SUMMARY */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-muted/40 p-4 rounded-xl">
                <InfoItem
                  label="Total Variants"
                  value={product?.variants?.length}
                />
                <InfoItem label="Stock" value={product?.stockQuantity} />
                <InfoItem label="Status" value={product?.availabilityStatus} />
                <InfoItem label="Min Qty" value={product?.minimumQuantity} />
              </div>

              {/* META */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <InfoItem label="Category" value={product?.category?.name} />
                <InfoItem
                  label="Sub Category"
                  value={product?.subCategory?.name}
                />
                <InfoItem label="Unit" value={product?.unit} />
                <InfoItem label="Country" value={product?.manufactureCountry} />
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2">
                {product?.tag?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4 border-t mt-6">
              <Button size="sm" variant="outline">
                Edit Base Product
              </Button>
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(MultipleVariantDetails);
