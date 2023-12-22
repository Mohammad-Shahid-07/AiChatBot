"use client";
import { generatesCodes } from "@/lib/actions/user.action";
import React from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { usePathname } from "next/navigation";

const GenCodeBtn = () => {
  const pathname = usePathname();
  const handleGenerateCodes = async () => {
    try {
      const res = await generatesCodes(pathname);
      toast({
        title: "Success",
        description: `Codes Generated `,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={handleGenerateCodes}> Generate Codes</Button>
    </>
  );
};

export default GenCodeBtn;
