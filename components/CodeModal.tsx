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

export function CodeModal() {
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
      const res = await checkCode(code);

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
        <Button className=" text-green-500 m-5">
          Enter Code
        </Button>
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
            <DialogFooter>
              <Button type="submit" className="mt-5">
                Add code
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
