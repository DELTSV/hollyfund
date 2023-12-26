import { useMemo } from "react";
import { Campaign } from "..";

type FundStats = {
  funds?: number;
  target?: number;
  percentage: number;
}

export const useCampaignFundStats = (campaign: Campaign | undefined): FundStats => useMemo(() => {
  if (!campaign) return {percentage: 0};
  
  const funds = Number(campaign.totalAmount), target = Number(campaign.targetAmount);
  return {funds, target, percentage: funds/target*100}
}, [campaign]);