import React, { useState } from "react";
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
import FullScreenLoader from "../../ui/FullScreenLoader";
import ErrorPage from "../../pages/ErrorPage";

import {
  useDeleteMultipleVariant,
  useGetSingleVariant,
} from "../../../hooks/api";

/* =========================
   COMPONENT
========================= */
const MultipleVariantList = () => {
  const navigate = useNavigate();
  const [loadingSlug, setLoadingSlug] = useState("");

  const {
    data: multipleVariants,
    isPending,
    isError,
    refetch,
  } = useGetSingleVariant("multiple"); //

  const deleteVariant = useDeleteMultipleVariant("multiple"); //

  if (isPending) {
    return <FullScreenLoader show />;
  }

  if (isError) {
    return (
      <ErrorPage
        title="Failed to load products"
        description="Please try again"
        onRetry={refetch}
      />
    );
  }

  const handleAdd = () => {
    navigate("/create-multiple-variant");
  };

  const handleEdit = (slug) => {
    navigate(`/edit-multiple-variant/${slug}`);
  };

  const handleDelete = (slug) => {
    setLoadingSlug(slug);
    deleteVariant.mutate(slug);
  };

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:w-3/4 xl:w-2/3 mx-auto my-6 md:my-[12vh]">
      <Card className="rounded-2xl shadow-2xl">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl sm:text-2xl font-semibold">
              Multiple Variant Products
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Manage all multiple-variant products from here
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
              {multipleVariants?.data?.map((product) => (
                <TableRow key={product._id}>
                  {/* Image */}
                  <TableCell>
                    <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                      <AvatarImage src={product.image} />
                      <AvatarFallback>{product.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>

                  {/* Name */}
                  <TableCell>
                    <div className="font-medium">{product.name}</div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                      <Link to={`/multiple-variant-details/${product.slug}`}>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </Link>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(product.slug)}
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
                              This will permanently delete <b>{product.name}</b>
                              .
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>

                            <AlertDialogAction
                              disabled={
                                deleteVariant.isPending &&
                                loadingSlug === product.slug
                              }
                              onClick={() => handleDelete(product.slug)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              {deleteVariant.isPending &&
                              loadingSlug === product.slug ? (
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

              {multipleVariants?.data?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No products found. What about adding some?
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

export default React.memo(MultipleVariantList);
