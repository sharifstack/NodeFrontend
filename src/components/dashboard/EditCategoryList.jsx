"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router";
import { api } from "../../helpers/axios";

const EditCategoryList = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [defaultdata, setDefaultdata] = useState({});

  const [name, setName] = useState("Electronics");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const abort = new AbortController();
    const getCategories = async () => {
      try {
        const res = await api.get(`/category/singlecategory/${slug}`);
        setDefaultdata(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
    return () => abort.abort();
  }, []);

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

  //handle back
  const handleBack = () => {
    navigate("/category-list");
  };

  console.log(defaultdata);

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
              <AvatarImage src={defaultdata?.image || image} />
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
              value={defaultdata?.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              className="cursor-pointer"
              onClick={handleBack}
              variant="outline"
            >
              Back
            </Button>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
            <Button className="cursor-pointer">Update Category</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCategoryList;
