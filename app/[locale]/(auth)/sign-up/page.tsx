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
import { CredentialsSignInForm } from "@/app/[locale]/(auth)/sign-up/signup-form";

import { auth } from "@/auth";
import { getSetting } from "@/lib/actions/setting.actions";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignUpPage(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const { site } = await getSetting();
  const searchParams = await props.searchParams;

  const { callbackUrl } = searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
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
          Create account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <CredentialsSignInForm />
        <Button variant="link" asChild className="flex justify-center">
          <Link href={`/sign-in?callbackUrl=${callbackUrl}`}>
            Already have an account?
          </Link>
        </Button>
        <Separator />
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
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
}
