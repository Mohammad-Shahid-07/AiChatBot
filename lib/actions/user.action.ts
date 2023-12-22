"use server";
import { revalidatePath } from "next/cache";
import Codes from "../model/codes.model";
import User from "../model/user.model";
import { connectToDatabase } from "../mongo";

import { newCodeGenerator } from "../utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createUserWithProvider(params: any) {
  try {
    connectToDatabase();
    const { user } = params;

    const existingUser = await User.findOne({
      email: user.email,
    });
    if (existingUser) {
      return;
    } else {
      const newUser = new User({
        name: user.name,
        email: user.email,
        image: user.image,
      });
      await newUser.save();
    }
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByEmail(email?: string) {
  try {
    connectToDatabase();
    const user = await User.findOne({ email });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}
// export async function generatesCodes() {
//   try {
//     connectToDatabase();
//     const codes = await Codes.find();
//     const newCodes = newCodeGenerator();
//     codes.filter((code) => {
//       return !newCodes.includes(code.code);
//     });
//     return newCodes;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function generatesCodes(pathname: string) {
  try {
    const newCodes = newCodeGenerator();

    // Find existing code
    const existingCodes = await Codes.find();

    console.log({ existingCodes });

    const filteredNewCodes = newCodes.filter(
      (code) => !existingCodes.includes(code),
    );

    // Bulk insert new codes
    console.log(`Adding ${filteredNewCodes} new codes to the database.`);

    if (filteredNewCodes.length > 0) {
      const addedCodes = await Codes.insertMany(
        filteredNewCodes.map((code) => ({ code })),
      );

      return addedCodes;
      revalidatePath(pathname);
    } else {
      console.log("No new codes to add.");
      return [];
    }
  } catch (error) {
    console.error("Error in generateCodes:", error);
    throw error;
  }
}

export async function checkCode(code: string) {
  try {
    await connectToDatabase();

    const userSession = await getServerSession(authOptions);

    if (!userSession) {
      console.error("User session not available.");
      return false;
    }

    const email = userSession?.user?.email;

    const isUsed = await Codes.findOne({ code });

    if (isUsed && isUsed.used) {
      console.log("Code is already used.");
      return false;
    } else {
      await User.findOneAndUpdate({ email }, { $set: { code } });
      await Codes.findOneAndUpdate({ code }, { $set: { used: true } });

      console.log("Code marked as used and associated with the user.");
      return true;
    }
  } catch (error) {
    console.error("Error in checkCode:", error);
    // Handle the error accordingly
    throw error;
  }
}

export async function getAllCodes() {
  try {
    await connectToDatabase();
    const codes = await Codes.find();
    return codes;
  } catch (error) {
    console.log(error);
  }
}
