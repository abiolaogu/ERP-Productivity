import { proxyActivities, defineSignal, defineQuery, setHandler } from '@temporalio/workflow';
import type * as activities from './activities';

const { createDriveFolder, addToChatChannel, sendWelcomeEmail } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

// Define the workflow
export async function onboardUserWorkflow(userId: string, email: string): Promise<void> {
  await createDriveFolder(userId);
  await addToChatChannel(userId, 'welcome-channel');
  await sendWelcomeEmail(email);
}
