'use client'

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function NavbarClient() {
    const router = useRouter()
    const { signOut } = useAuth();

    const handleSignOut = async () => {
      await signOut();
      router.push("/login");
    };

    return (
      <button
        onClick={handleSignOut}
        className="text-sm px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50"
      >
        sign out
      </button>
    );
}