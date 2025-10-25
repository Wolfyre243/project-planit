import { PrismaClient } from "../../generated/prisma/client.js";
import { APIError } from "../../types/error.types.js";

const prisma = new PrismaClient();

export const createUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

export const getUserByEmail = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
};

export const getUserById = async ({ userId }: { userId: string }) => {
  const user = await prisma.user.findUnique({
    where: { userId },
  });

  return user;
};
