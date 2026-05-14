"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();

  const signUp = async (name: string, email: string, password: string) => {
    await authClient.signUp.email({
      name,
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          toast.success('Account created!');
          router.push('/login');
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
        }
      }
    });
  };

  const signIn = async (email: string, password: string) => [
    await authClient.signIn.email({
      email,
      password,
      fetchOptions: {
        onError(ctx) {
          toast.error(ctx.error.message)
        },
        onSuccess: () => {
          toast.success('Welcome back!')
          router.push("/blog"); // redirect to login page
          router.refresh()
        },
      },
    }),
  ];

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("signed out");
          router.push("/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return { signUp, signIn, signOut };
};
