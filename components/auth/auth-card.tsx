import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface AuthCardProps {
  title: string;
  backHref: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AuthCard({ title, backHref, description, children, footer }: AuthCardProps) {
  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4">
      <Card className="w-full sm:max-w-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Link
              href={backHref}
              className="text-gray-400 text-xl hover:text-gray-600"
            >
              &laquo;
            </Link>
            <CardTitle className="font-serif text-2xl font-medium">
              {title}
            </CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && (
          <CardFooter className="flex flex-col gap-4">{footer}</CardFooter>
        )}
      </Card>
    </div>
  );
}
