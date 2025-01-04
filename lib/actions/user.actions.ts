"use server";

import { redirect } from "next/navigation";

import { IUserSignIn } from "@/types";
import { signIn, signOut } from "@/auth";

export const signInWithCredentials = async (user: IUserSignIn) => {
  return await signIn("credentials", { ...user, redirect: false });
};
export const SignOut = async () => {
  const redirectTo = await signOut({ redirect: false });
  redirect(redirectTo.redirect);
};
