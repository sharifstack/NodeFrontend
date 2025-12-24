"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const EditCategoryList = () => {
  const [name, setName] = useState("Electronics");
  const [image, setImage] = useState("https://via.placeholder.com/300");
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (file) formData.append("image", file);

    console.log("UPDATE CATEGORY 👉", { name, file });
  };

  return (
    <div className="w-1/2 mx-auto mt-20">
      <Card className="rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Edit Category</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-6 pt-6">
          {/* Image Preview */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="h-28 w-28 shadow-md">
              <AvatarImage src={image} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>

            <Label
              htmlFor="image"
              className="cursor-pointer text-sm text-primary hover:underline"
            >
              Change Image
            </Label>

            <Input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Category Name */}
          <div className="space-y-2">
            <Label>Category Name</Label>
            <Input
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Update Category</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCategoryList;
