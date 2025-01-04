import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { SeparatorWithOr } from "@/components/shared/separator-or";
import { GoogleSignInForm } from "@/app/(auth)/sign-in/google-signin-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CredentialsSignInForm } from "@/app/(auth)/sign-in/credentials-signin-form";

import { auth } from "@/auth";

import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignIn = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const { callbackUrl = "/" } = searchParams;

  const session = await auth();
  if (session) {
    return redirect(callbackUrl);
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <CredentialsSignInForm />
          <SeparatorWithOr />
          <div className="mt-4">
            <GoogleSignInForm />
          </div>
        </CardContent>
      </Card>
      <SeparatorWithOr>New to {APP_NAME}?</SeparatorWithOr>
      <Link href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
        <Button className="w-full" variant="outline">
          Create your {APP_NAME} account
        </Button>
      </Link>
    </div>
  );
};

export default SignIn;
