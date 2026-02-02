import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RecentProductsTable({ data = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Products</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item._id ?? index}>
                {/* ✅ name always string */}
                <TableCell className="font-medium">
                  {item.name || "—"}
                </TableCell>

                {/* ✅ subCategory safe rendering */}
                <TableCell>
                  {item.subCategory?.name || "—"}
                </TableCell>

                {/* ✅ brand safe rendering */}
                <TableCell>
                  {typeof item.brand === "object"
                    ? item.brand?.name
                    : item.brand || "—"}
                </TableCell>

                {/* ✅ variant type */}
                <TableCell>
                  <Badge variant="outline">
                    {item.productType || "single"}
                  </Badge>
                </TableCell>

                {/* ✅ date safe */}
                <TableCell>
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
