import express, { Request, Response } from 'express';
import { Connection, Client } from '@temporalio/client';
import { onboardUserWorkflow } from './workflows';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/onboard', async (req: Request, res: Response) => {
  const { userId, email } = req.body;

  if (!userId || !email) {
    return res.status(400).send({ error: 'userId and email are required' });
  }

  const connection = await Connection.connect();
  const client = new Client({ connection });

  console.log(`Starting onboarding workflow for userId: ${userId}, email: ${email}`);

  await client.workflow.start(onboardUserWorkflow, {
    taskQueue: 'onboarding',
    workflowId: `onboarding-${userId}`,
    args: [userId, email],
  });


  res.status(202).send({ message: 'Onboarding workflow started' });
});

app.listen(port, () => {
  console.log(`User Onboarding Service listening at http://localhost:${port}`);
});
