"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AtSign, Eye, EyeOff, Key } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { IUserSignIn } from "@/types";
import { toast } from "@/hooks/use-toast";
import { UserSignInSchema } from "@/lib/validator";
import useSettingStore from "@/hooks/use-setting-store";
import { signInWithCredentials } from "@/lib/actions/user.actions";

const signInDefaultValues =
  process.env.NODE_ENV === "development"
    ? {
        email: "admin@example.com",
        password: "123456",
      }
    : {
        email: "",
        password: "",
      };

export const CredentialsSignInForm = () => {
  const {
    setting: { site },
  } = useSettingStore();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const form = useForm<IUserSignIn>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: signInDefaultValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: IUserSignIn) => {
    try {
      await signInWithCredentials({
        email: data.email,
        password: data.password,
      });
      redirect(callbackUrl);
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-5">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter email address"
                      {...field}
                      className="pl-8"
                    />
                    <AtSign
                      size={16}
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isVisiblePassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="px-8"
                      {...field}
                    />
                    <Key
                      size={16}
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    {isVisiblePassword ? (
                      <EyeOff
                        size={16}
                        onClick={() =>
                          setIsVisiblePassword((prevState) => !prevState)
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                      />
                    ) : (
                      <Eye
                        size={16}
                        onClick={() =>
                          setIsVisiblePassword((prevState) => !prevState)
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <div className="text-xs text-center">
            By signing in, you agree to {site.name}&apos;s{" "}
            <Link href="/page/conditions-of-use">Conditions of Use</Link> and{" "}
            <Link href="/page/privacy-policy">Privacy Notice.</Link>
          </div>
        </div>
      </form>
    </Form>
  );
};
