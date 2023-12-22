import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllCodes } from "@/lib/actions/user.action";

const CodesTable = async () => {
  type Code = {
    _id: string;
    code: string;
    createdAt: Date;
    used: boolean;
    // Add any other properties if needed
  };

  type CodesData = {
    codes?: Code[];
  };
  const codes = await getAllCodes();

  return (
    <div className="text-white max-w-lg mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">S. NO.</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Used</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {codes?.map((code: Code, index: number) => (
            <TableRow key={code._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{code.code}</TableCell>
              <TableCell className="">
                <span
                  className={`p-2 rounded ${
                    code.used ? "bg-green-400" : "bg-red-400"
                  }`}
                >
                  {code.used ? "Used" : "Not Used"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CodesTable;
