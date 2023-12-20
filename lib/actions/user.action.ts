import User from "../model/user.model";
import { connectToDatabase } from "../mongo";

export async function createUserWithProvider(params: any) {
  try {
    connectToDatabase();
    const { user } = params;
    // Check if the user already exists
    const existingUser = await User.findOne({
      email: user.email,
    });
    if (existingUser) {
      // User exists, update the accounts array
      return;

      // Check if the user has a username
    } else {
      const newUser = new User({
        name: user.name,
        code: "1234",
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
