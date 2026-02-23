import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';

// Mock the Prisma client
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  folder: {
    create: jest.fn(),
  },
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

const app = express();
app.use(express.json());

// A simple middleware to create a user if they don't exist.
app.use('/users/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const user = await mockPrisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    await mockPrisma.user.create({ data: { id: userId } });
  }
  next();
});

app.post('/users/:userId/folders', async (req, res) => {
  const { userId } = req.params;
  const { name, parentFolderId } = req.body;

  if (!name) {
    return res.status(400).send({ error: 'Folder name is required' });
  }

  try {
    const newFolder = await mockPrisma.folder.create({
      data: {
        name,
        ownerId: userId,
        parentId: parentFolderId,
      },
    });
    res.status(201).send({ folderId: newFolder.id });
  } catch (error) {
    res.status(500).send({ error: 'Failed to create folder' });
  }
});

describe('Drive Service API', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should create a folder for an existing user', async () => {
    const userId = 'test-user';
    const folderName = 'My Test Drive';
    const newFolderId = 'new-folder-id';

    mockPrisma.user.findUnique.mockResolvedValue({ id: userId });
    mockPrisma.folder.create.mockResolvedValue({ id: newFolderId, name: folderName, ownerId: userId, parentId: null, createdAt: new Date(), updatedAt: new Date() });

    const response = await request(app)
      .post(`/users/${userId}/folders`)
      .send({ name: folderName });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ folderId: newFolderId });
    expect(mockPrisma.folder.create).toHaveBeenCalledWith({
      data: {
        name: folderName,
        ownerId: userId,
        parentId: undefined,
      },
    });
    expect(mockPrisma.user.create).not.toHaveBeenCalled();
  });

  it('should create a user and then create a folder', async () => {
    const userId = 'new-user';
    const folderName = 'My First Folder';
    const newFolderId = 'new-folder-id-2';

    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.user.create.mockResolvedValue({ id: userId });
    mockPrisma.folder.create.mockResolvedValue({ id: newFolderId, name: folderName, ownerId: userId, parentId: null, createdAt: new Date(), updatedAt: new Date() });

    const response = await request(app)
      .post(`/users/${userId}/folders`)
      .send({ name: folderName });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ folderId: newFolderId });
    expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: { id: userId } });
    expect(mockPrisma.folder.create).toHaveBeenCalledWith({
      data: {
        name: folderName,
        ownerId: userId,
        parentId: undefined,
      },
    });
  });

  it('should return a 400 error if the folder name is missing', async () => {
    const userId = 'test-user';

    const response = await request(app)
      .post(`/users/${userId}/folders`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Folder name is required');
    expect(mockPrisma.folder.create).not.toHaveBeenCalled();
  });
});
