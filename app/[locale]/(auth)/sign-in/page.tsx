import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SeparatorWithOr } from "@/components/shared/separator-or";
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
  const session = await auth();
  const { site } = await getSetting();
  const searchParams = await props.searchParams;
  const { callbackUrl = "/" } = searchParams;

  if (session) {
    return redirect(callbackUrl);
  }

  return (
    <Card className="max-w-md h-fit">
      <CardHeader>
        <CardTitle className="flex justify-center items-center gap-2">
          <Link href="/">
            <Image
              src="/icons/logo.svg"
              alt="logo"
              width={30}
              height={30}
              priority
              className="aspect-square"
            />
          </Link>
          Sign In
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CredentialsSignInForm />
        <SeparatorWithOr />
        <GoogleSignInForm />
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button variant="link" asChild>
          <Link
            href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          >
            Create your {site.name} account
          </Link>
        </Button>
        <Separator />
        <ul className="flex items-center gap-4 text-sm justify-center">
          <li>
            <Link href="/page/conditions-of-use">Conditions of Use</Link>
          </li>
          <li>
            <Link href="/page/privacy-policy">Privacy Notice</Link>
          </li>
          <li>
            <Link href="/page/help">Help</Link>
          </li>
        </ul>
        <p className="text-xs text-center">{site.copyright}</p>
      </CardFooter>
    </Card>
  );
};

export default SignInPage;
