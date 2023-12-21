import {Campaign} from "../";
import {useMemo} from "react";
import {card} from "./style.module.css";

type CampaignCardProps = {
  campaign: Campaign
  onClick: (title: string) => void;
}

export const CampaignCard = ({campaign, onClick}: CampaignCardProps) => {
  const [funds, percentage] = useMemo(() => {
    const funds = Number(campaign.totalAmount), target = Number(campaign.targetAmount);
    return [funds, funds/target*100]
  }, [campaign])
  const handleClick = () => onClick(campaign.title);

  return <li className={card}>
    <button onClick={handleClick}>
      <h3>{campaign.title}</h3>
      <footer>
        <h4>{funds} ETH raised</h4>
        <h5>{percentage}% funded</h5>
      </footer>
    </button>
  </li>;
}
