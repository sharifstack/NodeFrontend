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
    <div className="w-full px-3 sm:px-4 md:px-6 lg:w-3/4 xl:w-2/3 mx-auto my-6 md:my-[12vh]">
      <Card className="rounded-2xl shadow-2xl">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl sm:text-2xl font-semibold">
              Single Variant Products
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Manage all single-variant products from here
            </CardDescription>
          </div>

          <Button size="sm" className="w-full sm:w-auto" onClick={handleAdd}>
            Add Product
          </Button>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table className="min-w-[520px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {singleVariant?.data?.map((product) => (
                <TableRow key={product._id}>
                  {/* Image */}
                  <TableCell>
                    <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                      <AvatarImage src={product.image} />
                      <AvatarFallback>{product.name}</AvatarFallback>
                    </Avatar>
                  </TableCell>

                  {/* Product Info */}
                  <TableCell className="max-w-[180px] truncate sm:max-w-none">
                    <div className="font-medium text-sm sm:text-base truncate">
                      {product.name}
                    </div>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-right">
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                      <Link to={`/single-variant-details/${product.slug}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full sm:w-auto"
                        >
                          View
                        </Button>
                      </Link>

                      <Button
                        onClick={() => handleEdit(product.slug)}
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
                        Edit
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="w-full sm:w-auto"
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the <b>{product.name}</b>{" "}
                              Product.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
                            <AlertDialogCancel className="w-full sm:w-auto">
                              Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                              disabled={
                                deleteVariant.isPending &&
                                singleVariantLoading === product.slug
                              }
                              className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                              onClick={() => handleDelete(product.slug)}
                            >
                              {deleteVariant.isPending &&
                              singleVariantLoading === product.slug ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                  Deleting
                                </>
                              ) : (
                                "Yes, Delete"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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
