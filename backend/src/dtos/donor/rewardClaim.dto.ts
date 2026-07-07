import { z } from "zod";

export const ClaimRewardDTO = z.object({
  rewardId: z.string().min(1, "Reward ID is required"),
});

export type ClaimRewardType = z.infer<typeof ClaimRewardDTO>;
