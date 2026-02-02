import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({ title, value }) {
  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="mt-2 text-3xl font-semibold">{value}</h2>
      </CardContent>
    </Card>
  );
}
