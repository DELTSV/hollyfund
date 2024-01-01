import { useMemo } from "react";
import { Campaign } from "..";

type FundStats = {
  funds?: number;
  target?: number;
  percentage: string;
}

export const useCampaignFundStats = (campaign: Campaign | undefined): FundStats => useMemo(() => {
  if (!campaign) return {percentage: "0.00"};
  
  const funds = Number(campaign.totalAmount), target = Number(campaign.targetAmount);
  return {funds, target, percentage: (funds/target*100).toFixed(2)}
}, [campaign]);