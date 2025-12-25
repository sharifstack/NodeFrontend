import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "../../helpers/axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Groceries",
    image: "https://via.placeholder.com/150",
  },
];

const CategoryList = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const abort = new AbortController();
    const getCategories = async () => {
      try {
        const res = await api.get("/category/get-all-category");
        setCategoryList(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
    return () => abort.abort();
  }, []);

  //edit category
  const handleEdit = (slug) => {
    navigate(`/edit-categorylist/${slug}`);
  };

  //delete category
  const handleDelete = async (slug) => {
    const res = await api.delete(`/category/deletecategory/${slug}`);
    console.log("delete", res);
  };

  //Add category
  const HandleAddCategory = () => {
    navigate("/create-category");
  };

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Category List</CardTitle>

        <Button
          onClick={HandleAddCategory}
          className="cursor-pointer"
          size="sm"
        >
          Add Category
        </Button>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categoryList?.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={category.image} />
                    <AvatarFallback>{category.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>

                <TableCell className="font-medium">{category.name}</TableCell>

                <TableCell className="text-right space-x-2">
                  <Button
                    className="cursor-pointer"
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(category.slug)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="cursor-pointer"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(category.slug)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CategoryList;
