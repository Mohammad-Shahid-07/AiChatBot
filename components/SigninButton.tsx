"use client";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

const SigninButton = () => {
  return (
    <Button
      className="font-semibold p-5"
      onClick={() => {
        signIn("google");
      }}
    >
      Sign in
    </Button>
  );
};

export default SigninButton;
