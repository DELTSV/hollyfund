import {Campaign} from "../";
import {useMemo} from "react";

type CampaignCardProps = {
  campaign: Campaign
  onClick: (title: string) => void;
}

export const CampaignCard = ({campaign, onClick}: CampaignCardProps) => {
  const percentage = useMemo(() => campaign.totalAmount/campaign.targetAmount*100, [campaign])
  const handleClick = () => onClick(campaign.title);

  return <button onClick={handleClick}>
    {percentage}
  </button>;
}
