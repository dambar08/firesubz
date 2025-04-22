"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as motion from "motion/react-client"
import { z } from "zod";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
  
      const emailSchema = z.string().email({
        message: "Please enter a valid email address.",
      }).min(1, {
        message: "Email is required.",
      });
  
      const validationResult = emailSchema.safeParse(email);
      if (!validationResult.success) {
        setError(validationResult.error.issues[0].message);
        return;
      }

    const result = await signIn("nodemailer", {
      email,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else if (result?.ok){
        router.push("/dashboard");
    }
  };
  
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-screen bg-gray-100"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">Sign In with Email</Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
  );
}