import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmptyState() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="text-xl font-semibold">Welcome to your Dashboard 👋</h3>
        <p className="mt-2 text-muted-foreground">
          Start by creating your first category or product
        </p>

        <div className="mt-6 flex gap-4">
          <Button>Create Category</Button>
          <Button variant="outline">Add Product</Button>
        </div>
      </CardContent>
    </Card>
  );
}
