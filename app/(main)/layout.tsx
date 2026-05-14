import Navbar from "@/components/shared/navbar";
import { Toaster } from "sonner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <Navbar />
        {children}
        <Toaster position="bottom-right" />
    </>
  );
}
