"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // adjust path if needed
import LoginDialogBox from "@components/LoginDialogBox";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/"); // Redirect to home if already logged in
    }
  }, [user, router]);

  // While redirecting or if user exists, optionally render nothing
  if (user) {
    return null;
  }

  return <LoginDialogBox />;
}
