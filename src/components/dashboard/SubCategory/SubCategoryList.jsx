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
import { useGetAllSubCategories } from "../../../hooks/api";
import FullScreenLoader from "../../ui/FullScreenLoader";
import ErrorPage from "../../pages/ErrorPage";
import { useNavigate } from "react-router";

/* =========================
   Dummy UI Data (replace later)
========================= */
const subCategories = [
  {
    id: "1",
    name: "Xiaomi v1",
    category: "Mobile",
  },
  {
    id: "2",
    name: "Samsung S Series",
    category: "Mobile",
  },
  {
    id: "3",
    name: "Gaming Laptop",
    category: "Laptop",
  },
];

const SubCategoryList = () => {
  const navigate = useNavigate();

  const { data, isPending, isError, refetch } = useGetAllSubCategories();

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

  //navigate to add sub-category page
  const handleAddSubCategory = () => {
    navigate("/create-subcategory");
  };

  return (
    <div className="w-3/4 mx-auto my-[12vh]">
      <Card className="shadow-2xl rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold">
              Sub Category List
            </CardTitle>
            <CardDescription>
              Manage all sub-categories from here
            </CardDescription>
          </div>

          <Button className="cursor-pointer" onClick={handleAddSubCategory} size="sm">
            Add Sub Category
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sub Category</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.name}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">{item.category?.name}</Badge>
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button className="cursor-pointer" size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button className="cursor-pointer" size="sm" variant="destructive">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {data?.data?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-muted-foreground py-10"
                  >
                    No sub-categories found
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

export default SubCategoryList;
