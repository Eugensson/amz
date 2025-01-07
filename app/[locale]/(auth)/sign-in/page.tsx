import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { SeparatorWithOr } from "@/components/shared/separator-or";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleSignInForm } from "@/app/[locale]/(auth)/sign-in/google-signin-form";
import { CredentialsSignInForm } from "@/app/[locale]/(auth)/sign-in/credentials-signin-form";

import { auth } from "@/auth";
import { getSetting } from "@/lib/actions/setting.actions";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const { site } = await getSetting();

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
          <div>
            <CredentialsSignInForm />
            <SeparatorWithOr />
            <div className="mt-4">
              <GoogleSignInForm />
            </div>
          </div>
        </CardContent>
      </Card>
      <SeparatorWithOr>New to {site.name}?</SeparatorWithOr>

      <Link href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
        <Button className="w-full" variant="outline">
          Create your {site.name} account
        </Button>
      </Link>
    </div>
  );
};

export default SignInPage;
