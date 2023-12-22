"use server";
import { revalidatePath } from "next/cache";
import Codes from "../model/codes.model";
import User from "../model/user.model";
import { connectToDatabase } from "../mongo";

import { newCodeGenerator } from "../utils";

import { auth, currentUser } from "@clerk/nextjs";

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

export async function getUserByClrekId(clerkId?: string) {
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId });
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

interface CheckCodeParams {
  code: string;
  pathname: string;
}

export async function checkCode(params: CheckCodeParams) {
  try {
    await connectToDatabase();
    const { code, pathname } = params;

    const { userId } = auth();

    if (!userId) {
      throw new Error("User session not available.");
    }

    // Check if user already exists
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      const currentUserInfo = await currentUser();

      user = await new User({
        clerkId: userId,
        name: `${currentUserInfo?.firstName} ${currentUserInfo?.lastName}`,
        email: currentUserInfo?.emailAddresses[0]?.emailAddress,
        image: currentUserInfo?.imageUrl,
      }).save();
    }

    const isUsed = await Codes.findOne({ code });

    if (isUsed?.used || !isUsed) {
      console.log("Code is already used.");
      return false;
    } else {
      // Use findOneAndUpdate with upsert for user creation or update
      await User.findOneAndUpdate(
        { clerkId: userId },
        { $set: { code } },
        { upsert: true },
      );
      await Codes.findOneAndUpdate({ code }, { $set: { used: true } });

      console.log("Code marked as used and associated with the user.");
      revalidatePath(pathname);
      return true;
    }
  } catch (error: any) {
    console.error("Error in checkCode:", error.message || error);
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
