import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ErrorPage = ({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
}) => {
  return (
    <div className="h-[70vh] flex items-center justify-center">
      <Card className="w-1/2 shadow-2xl rounded-2xl text-center">
        <CardContent className="py-12 space-y-4">
          <div className="text-5xl">😕</div>

          <h2 className="text-xl font-semibold">{title}</h2>

          <p className="text-muted-foreground">{description}</p>

          {onRetry && (
            <Button onClick={onRetry} className="mt-4 cursor-pointer">
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
