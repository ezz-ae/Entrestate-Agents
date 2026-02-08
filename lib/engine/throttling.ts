import { prisma } from '@/lib/prisma';

export async function checkSpendThrottling(campaignId: string) {
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
  });

  if (!campaign) return true;

  const usageRatio = campaign.spent / campaign.budget;

  if (usageRatio >= 1.0) {
    console.warn(`Campaign ${campaignId} has reached its budget. Throttling active.`);
    return false; // Kill switch: stop execution
  }

  if (usageRatio >= 0.8) {
    console.info(`Campaign ${campaignId} at 80% budget. Issuing warning.`);
  }

  return true; // Safe to execute
}

export async function logExecutionSpend(amount: number, category: string, agentId: string) {
  return await prisma.spendLog.create({
    data: {
      amount,
      category,
      description: `Execution by agent ${agentId}`
    }
  });
}
