import { Request, Response } from 'express';
import { catchAsync } from '../../lib/catch-async.js';
import { PrismaClient } from '../../generated/prisma/client.js';

const prisma = new PrismaClient();

export const getCurrentUser = catchAsync(async (req: Request, res: Response) => {
  const userId = res.locals.user?.id;

  const user = await prisma.user.findUnique({
    where: { userId },
    select: {
      userId: true,
      email: true,
      name: true,
    },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(200).json({
    data: {
      id: user.userId,
      email: user.email,
      name: user.name,
    },
  });
});