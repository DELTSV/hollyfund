import {Campaign} from "../";
import {useMemo} from "react";
import {card, bar, progress} from "./style.module.css";
import {gradientText, gradientBar} from "../../../utils";

type CampaignCardProps = {
  campaign: Campaign
  onClick: (title: string) => void;
}

export const CampaignCard = ({campaign, onClick}: CampaignCardProps) => {
  const [funds, target, percentage] = useMemo(() => {
    const funds = Number(campaign.totalAmount), target = Number(campaign.targetAmount);
    return [funds, target, funds/target*100]
  }, [campaign])
  const handleClick = () => onClick(campaign.title);

  return <li className={card} onClick={handleClick}>
    <button>
      <h3>{campaign.title}</h3>
      <footer>
        <h4><span className={gradientText}>{funds}</span> / {target} ETH raised</h4>
        <div id={bar}>
          <div id={progress} className={gradientBar} style={{width: `${percentage}%`}}></div>
        </div>
        <h5 className={gradientText}>{percentage}% funded</h5>
      </footer>
    </button>
  </li>;
}
