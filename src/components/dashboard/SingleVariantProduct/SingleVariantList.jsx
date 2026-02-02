import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

import { Link, useNavigate } from "react-router";
import { useState } from "react";

import FullScreenLoader from "../../ui/FullScreenLoader";
import ErrorPage from "../../pages/ErrorPage";
import {
  useDeleteSingleVariant,
  useEditSingleVariant,
  useGetSingleVariant,
} from "../../../hooks/api";

// 👉 replace later with real hooks
// import { useGetAllSingleVariants, useDeleteSingleVariant } from "../../../hooks/api";

/* =========================
   DUMMY DATA (UI ONLY)
========================= */
const products = [
  {
    _id: "1",
    name: "Black T-Shirt",
    sku: "SKU-001",
    image: "https://via.placeholder.com/100",
    retailPrice: 150,
    stockQuantity: 120,
    isActive: true,
  },
  {
    _id: "2",
    name: "Wireless Headphone",
    sku: "SKU-002",
    image: "https://via.placeholder.com/100",
    retailPrice: 2500,
    stockQuantity: 0,
    isActive: false,
  },
];

const SingleVariantList = () => {
  const navigate = useNavigate();
  const [singleVariantLoading, setSingleVariantLoading] = useState("");

  const {
    data: singleVariant,
    isPending,
    isError,
  } = useGetSingleVariant("single");

  const deleteVariant = useDeleteSingleVariant("single");

  // const { data, isPending, isError, refetch } = useGetAllSingleVariants();
  // const deleteVariant = useDeleteSingleVariant();

  const data = { data: products };

  if (isPending) {
    return <FullScreenLoader show={true} />;
  }

  if (isError) {
    return (
      <ErrorPage
        title="Failed to load products"
        description="Please check your internet connection or try again."
      />
    );
  }

  const handleEdit = (slug) => {
    navigate(`/edit-single-variant/${slug}`);
  };

  const handleAdd = () => {
    navigate("/create-single-variant");
  };

  const handleDelete = (slug) => {
    setSingleVariantLoading(slug);
    deleteVariant.mutate(slug);
  };

  return (
    <div className="w-2/4 mx-auto my-[12vh]">
      <Card className="rounded-2xl shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold">
              Single Variant Products
            </CardTitle>
            <CardDescription>
              Manage all single-variant products from here
            </CardDescription>
          </div>

          <Button size="sm" onClick={handleAdd}>
            Add Product
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Product Name</TableHead>

                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {singleVariant?.data?.map((product) => (
                <TableRow key={product._id}>
                  {/* Image */}
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={product.image} />
                      <AvatarFallback>{product.name}</AvatarFallback>
                    </Avatar>
                  </TableCell>

                  {/* Product Info */}
                  <TableCell>
                    <div className="font-medium">{product.name}</div>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-right space-x-2">
                    <Link to={`/single-variant-details/${product.slug}`}>
                      <Button variant="outline">View Product</Button>
                    </Link>

                    <Button
                      className="cursor-pointer"
                      onClick={() => handleEdit(product.slug)}
                      size="sm"
                      variant="outline"
                    >
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the <b>{product.name}</b> Product.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction
                            disabled={
                              deleteVariant.isPending &&
                              singleVariantLoading === product.slug
                            }
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => handleDelete(product.slug)}
                          >
                            {deleteVariant.isPending &&
                            singleVariantLoading === product.slug ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Deleting
                              </>
                            ) : (
                              "Yes, Delete"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}

              {data?.data?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleVariantList;
