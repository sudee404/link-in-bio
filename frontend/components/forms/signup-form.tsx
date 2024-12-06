"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

export function SignUpForm() {
  const { status } = useSession()
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      account_type: "personal",
      business_name: "",
    },
  });

  const account_type = watch("account_type");

  const onSubmit = async (data: SignUpInput) => {
    let formData: Partial<SignUpInput> = {
      email: data.email,
      password: data.password,
      account_type: data.account_type,
    };

    if (data.account_type === "business") {
      formData.business_name = data.business_name;
    }
    setIsLoading(true);

    await axios
      .post("/api/auth/register", formData)
      .then((res) => {
        toast.success("Account created successfully");
        // signIn 
        signIn("django-provider", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: "/accounts",
        });
      })
      .catch((err) => {
        Object.entries(err?.response?.data?.errors || {}).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


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
                Authorized dealer and distributor network onboarding
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                More than 5000 authorized dealers and distributors have chosen
                LinkFolio to grow their businesses using our intelligent suite
                of applications
              </p>
            </div>
            <div className="relative w-60 h-60 sm:w-80 sm:h-80 mx-auto">
              <img
                src="/img/handshake.svg?height=256&width=256"
                alt="Handshake illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right side - Form section */}
          <div className="p-6 sm:p-12 bg-white dark:bg-gray-900">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                  Create Your Account
                </h1>
                <Link
                  href={`/login?callbackUrl=${callbackUrl}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Already have an account?
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
                    disabled={isSubmitting || isLoading}
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
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                    disabled={isSubmitting || isLoading}
                    required
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="account_type"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Account Type
                    </label>

                    <Select
                      value={watch("account_type")}
                      onValueChange={(value:any) => setValue('account_type',value)}
                      disabled={isSubmitting || isLoading}
                      required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Account Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Account Types</SelectLabel>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.account_type && (
                      <p className="text-red-500 text-sm">
                        {errors.account_type.message}
                      </p>
                    )}
                  </div>

                  {account_type === "business" && (
                    <div className="space-y-2">
                      <label
                        htmlFor="company"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Business Name
                      </label>
                      <Input
                        {...register("business_name")}
                        id="company"
                        placeholder="Business name"
                        disabled={isSubmitting || isLoading}
                        required
                        className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      />
                      {errors.business_name && (
                        <p className="text-red-500 text-sm">
                          {errors.business_name.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <Checkbox
                  aria-label="By clicking 'Sign Up' you agree to our Terms and Privacy Policy"
                  required
                  className="text-blue-600 dark:text-blue-400"
                />
                <button
                  type="submit"
                  className={cn(
                    "w-full rounded-md bg-blue-600 dark:bg-blue-500 px-4 py-2.5 sm:py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 dark:hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:shadow-lg",
                    (isSubmitting || isLoading) && "opacity-50 cursor-wait"
                  )}
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? "Signing up..." : "Sign Up"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
