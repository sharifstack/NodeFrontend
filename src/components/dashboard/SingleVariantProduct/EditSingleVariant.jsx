import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Loader2, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";

import {
  useEditSingleVariant,
  useOneSingleVariant,
  useUploadSingleVariant,
} from "../../../hooks/api";

import FullScreenLoader from "../../ui/FullScreenLoader";
import ErrorPage from "../../pages/ErrorPage";
import { useEffect } from "react";

const EditSingleVariant = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const { data, isPending, isError } = useOneSingleVariant(slug);
  const editSingleVariant = useEditSingleVariant();
  const uploadImage = useUploadSingleVariant();

  const [form, setForm] = useState({
    name: "",
    retailPrice: "",
    stockQuantity: "",
    isActive: false,
  });

  useEffect(() => {
    if (data?.data) {
      setForm({
        name: data?.data?.name || "",
        retailPrice: data?.data?.retailPrice || "",
        stockQuantity: data?.data?.stockQuantity || "",
        isActive: data?.data?.isActive || false,
      });
    }
  }, [data]);

  if (isPending) return <FullScreenLoader show />;

  if (isError) {
    return (
      <ErrorPage
        title="Failed to load product"
        description="Please try again later."
      />
    );
  }

  const product = data.data;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = () => {
    if (!image.length) return;
    uploadImage.mutate({ slug, images });
  };

  const handleSubmit = () => {
    if (image.length > 0) {
      uploadImage.mutate({ slug, image });
    }

    editSingleVariant.mutate({
      slug,
      values: form,
    });
  };

  return (
    <div className="w-3/5 mx-auto my-[4vh]">
      <Card className="rounded-2xl shadow-2xl">
        {/* ================= Header ================= */}
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Edit Single Variant
          </CardTitle>
          <CardDescription>
            Update product details and availability
          </CardDescription>
        </CardHeader>

        <Separator />

        {/* ================= Content ================= */}
        <CardContent className="space-y-6 pt-6">
          {/* Image */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-28 w-28">
              <AvatarImage src={preview || product.image} />
              <AvatarFallback>{product.name?.[0]}</AvatarFallback>
            </Avatar>

            <input
              type="file"
              hidden
              id="product-image"
              onChange={handleImageChange}
            />

            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("product-image").click()}
            >
              Change Image
            </Button>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* SKU (Readonly) */}
          <div className="space-y-2">
            <Label>SKU</Label>
            <Input value={product.sku} disabled />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Retail Price</Label>
              <Input
                type="number"
                value={form.retailPrice}
                onChange={(e) => handleChange("retailPrice", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                value={form.stockQuantity}
                onChange={(e) => handleChange("stockQuantity", e.target.value)}
              />
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Product Status</p>
              <p className="text-sm text-muted-foreground">
                Toggle product availability
              </p>
            </div>
            <Switch
              checked={form.isActive}
              onCheckedChange={(value) => handleChange("isActive", value)}
            />
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={editSingleVariant.isPending}
              className="gap-2"
            >
              {editSingleVariant.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(EditSingleVariant);
