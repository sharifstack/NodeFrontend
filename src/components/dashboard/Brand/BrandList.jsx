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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetAllBrand } from "../../../hooks/api";
import FullScreenLoader from "../../ui/FullScreenLoader";
import ErrorPage from "../../pages/ErrorPage";
import { useNavigate } from "react-router";

/* =========================
   Dummy UI Data (replace later)
========================= */
const brands = [
  {
    id: "1",
    name: "Mi",
    since: 2001,
    image: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    name: "Samsung",
    since: 1938,
    image: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    name: "Apple",
    since: 1976,
    image: "https://via.placeholder.com/100",
  },
];

const BrandList = () => {
  const navigate = useNavigate();

  const { data, isPending, isError, refetch } = useGetAllBrand();

  //loading state
  if (isPending) {
    return <FullScreenLoader show={true} />;
  }

  //error state
  if (isError) {
    return (
      <ErrorPage
        title="Failed to load sub-categories"
        description="Please check your internet connection or try again."
        onRetry={refetch}
      />
    );
  }

  const handleAddBrand = () => {
    navigate("/create-brand");
  };

  //edit brand
  const handleEdit = (slug) => {
    navigate(`/edit-brand/${slug}`);
  };

  return (
    <div className="w-4/5 mx-auto my-[12vh]">
      <Card className="shadow-2xl rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold">Brand List</CardTitle>
            <CardDescription>
              Manage all product brands from here
            </CardDescription>
          </div>

          <Button className="cursor-pointer" onClick={handleAddBrand} size="sm">
            Add Brand
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Logo</TableHead>
                <TableHead>Brand Name</TableHead>
                <TableHead>Since</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data?.map((brand) => (
                <TableRow key={brand._id}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={brand.image} />
                      <AvatarFallback>{brand.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>

                  <TableCell className="font-medium">{brand.name}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">Since {brand.since}</Badge>
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button
                      className="cursor-pointer"
                      onClick={() => handleEdit(brand.slug)}
                      size="sm"
                      variant="outline"
                    >
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {data?.data?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground py-10"
                  >
                    No brands found
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

export default BrandList;
