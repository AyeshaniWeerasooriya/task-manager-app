"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@firebase/firebaseConfig";
import { Button } from "@components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

export default function LoginDialogBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // redirect to homepage
    } catch (err) {
      setErrorMsg("Invalid login. Please check your credentials.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm bg-white rounded-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-2">Hello!</CardTitle>
          <CardDescription>
            Fill in your username and password to sign in
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="rounded-sm"
                  // placeholder="Username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="rounded-sm"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2 mt-2">
          <Button
            variant="outline"
            className="w-full text-white bg-blue-900 rounded-sm"
            type="submit"
            onClick={handleLogin}
          >
            SIGN IN
          </Button>
          <div className=" w-full flex items-center justify-center gap-1 text-xs ">
            <p className="text-muted-foreground">DON'T HAVE AN ACCOUNT</p>
            <Button
              className="p-0 h-auto text-xs"
              variant="link"
              onClick={() => router.push("/register")}
            >
              SiGN UP NOW
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
