
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
    useEffect(() => {
    if (!user) {
      router.replace("/login"); // redirect to /login
    }
  }, [user, router]);

  if (!user) {
    // Optionally render nothing or a loading state while redirecting
    return null;
  }

  return (
  <main className="min-h-screen bg-gradient-to-br from-gray-700 to-purple-700">
     <h1>Logged in</h1>
    </main>
  );
}
