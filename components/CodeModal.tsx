"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkCode } from "@/lib/actions/user.action";

import { useState } from "react";
import { toast } from "./ui/use-toast";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export function CodeModal() {
  const pathname = usePathname();
  const [code, setCode] = useState("");
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (!code)
        return toast({
          title: "Error",
          description: "Please enter a code",
          variant: "destructive",
        });
      const res = await checkCode({ code, pathname });

      if (res) {
        toast({
          title: "Success",
          description: "Code is valid",
        });
      } else {
        toast({
          title: "Error",
          description: "Code is not valid or already used",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`text-4xl font-black text-white flex min-h-[10rem] min-w-[10rem] md:h-40 md:w-40 lg:h-52 lg:w-52 
     cursor-pointer items-center justify-center rounded-full border-2 shadow-xl transition-all hover:scale-105 dark:shadow-dark-200`}
        >
          Speak
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-600/5">
        <DialogHeader>
          <DialogTitle className="text-white font-semibold">
            Enter Code
          </DialogTitle>
          <DialogDescription>
            Please Enter a uniqe code to use the application.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right text-white">
                Code
              </Label>
              <Input
                id="code"
                className="col-span-3"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <Button type="submit" className="mt-5 block mx-auto ">
              Add code
            </Button>
          </form>
        </div>
        <DialogFooter className="text-white ">
          <span>If you don&rsquo;t have a code, please contact the admin.</span>

          <Link
            href="https://www.linkedin.com/in/mohammad-07-shahid/"
            target="_blank"
          >
            <Image
              src="/assets/icons/linkedin.svg"
              alt="linkedin"
              width={30}
              height={30}
            />
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
