"use client";

import * as React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { SignInInput, signInSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export function SignInForm() {
  const {status} = useSession()
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(formData: SignInInput) {
    setIsLoading(true);
    await signIn("django-provider", {
      ...formData,
      redirect: false,
    })
      .then(() => {
        toast.success("Login successful, redirecting ...");
        router.push(callbackUrl);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status]);
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-white dark:bg-gray-900">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-900 rounded-lg sm:rounded-card shadow-xl overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
          {/* Left side - Hero section */}
          <div className="space-y-6 sm:space-y-8 p-6 sm:p-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 h-full">
            <div>
              <Link
                href="/"
                className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400"
              >
                LinkFolio
              </Link>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">
                Welcome back to LinkFolio
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                Sign in to access your account and manage your digital presence
              </p>
            </div>
            <div className="relative w-60 h-60 sm:w-80 sm:h-80 mx-auto">
              <img
                src="/img/handshake.svg?height=256&width=256"
                alt="Welcome illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right side - Form section */}
          <div className="p-6 sm:p-12 bg-white dark:bg-gray-900">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                  Sign Into Your Account
                </h1>
                <Link
                  href={`/register?callbackUrl=${callbackUrl}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Don't have an account?
                </Link>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address
                  </label>
                  <Input
                    {...register("email")}
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    icon={<Mail className="h-4 w-4" />}
                    required
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                    {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                    disabled={isLoading}
                    required
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                    {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox className="text-blue-600 dark:text-blue-400" />
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Remember this device
                  </label>
                </div>
                <button
                  type="submit"
                  className={cn(
                    "w-full rounded-md bg-blue-600 dark:bg-blue-500 px-4 py-2.5 sm:py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 dark:hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:shadow-lg",
                    isLoading && "opacity-50 cursor-wait"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
