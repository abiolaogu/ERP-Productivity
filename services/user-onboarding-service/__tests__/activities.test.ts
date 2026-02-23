import * as activities from '../src/activities';
import { DefaultService as DriveService } from 'drive-service-client';

// Mock the drive-service-client
jest.mock('drive-service-client', () => ({
  DefaultService: {
    postUsersFolders: jest.fn().mockResolvedValue({ folderId: 'mock-folder-id' }),
  },
  OpenAPI: {
    BASE: '',
  },
}));

describe('Onboarding Activities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the drive service to create a folder', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await activities.createDriveFolder('test-user');

    expect(DriveService.postUsersFolders).toHaveBeenCalledWith('test-user', { name: 'My Drive' });
    expect(consoleSpy).toHaveBeenCalledWith('Creating drive folder for user test-user...');
    expect(consoleSpy).toHaveBeenCalledWith('Successfully created drive folder for user test-user');
  });

  it('should log a message when adding a user to a chat channel', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await activities.addToChatChannel('test-user', 'test-channel');
    expect(consoleSpy).toHaveBeenCalledWith('Adding user test-user to channel test-channel...');
  });

  it('should log a message when sending a welcome email', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await activities.sendWelcomeEmail('test@example.com');
    expect(consoleSpy).toHaveBeenCalledWith('Sending welcome email to test@example.com...');
  });
});
