import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// A simple middleware to create a user if they don't exist.
// In a real app, this would be handled by a user service and triggered
// by the user.created event.
app.use('/users/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    await prisma.user.create({ data: { id: userId } });
  }
  next();
});

app.post('/users/:userId/folders', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name, parentFolderId } = req.body;

  if (!name) {
    return res.status(400).send({ error: 'Folder name is required' });
  }

  try {
    const newFolder = await prisma.folder.create({
      data: {
        name,
        ownerId: userId,
        parentId: parentFolderId,
      },
    });

    res.status(201).send({ folderId: newFolder.id });
  } catch (error) {
    // This could happen if the parentFolderId is invalid, for example.
    console.error(error);
    res.status(500).send({ error: 'Failed to create folder' });
  }
});

app.listen(port, () => {
  console.log(`Drive Service listening at http://localhost:${port}`);
});
