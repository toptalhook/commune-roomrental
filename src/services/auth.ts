"use server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export const registerUser = async ({
  name,
  email,
  password: inputPassword,
  walletAddress: walletAddress,
}: {
  name: string;
  email: string;
  password: string;
  walletAddress: string,
}) => {
  try {
    if (!name || !email || !inputPassword)
      throw new Error("Please provide all credentials");
    const hashedPassword = await bcrypt.hash(inputPassword, 12);

    const user = await db.user.create({
      data: {
        walletAddress,
        email,
        name,
        password: hashedPassword,
      },
    });

    return {
      walletAddress: user.walletAddress,
      id: user.id,
      email: user.email,
      name: user.name,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
