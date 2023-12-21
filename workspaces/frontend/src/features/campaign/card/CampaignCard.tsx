import {Campaign, SelectedCampaign} from "../";
import {createRef, useMemo} from "react";
import {card, bar, progress} from "./style.module.css";
import {gradientText, gradientBar} from "../../../utils";

type CampaignCardProps = {
  isActive: boolean;
  campaign: Campaign;
  onClick: (card: SelectedCampaign) => void;
}

export const CampaignCard = ({isActive, campaign, onClick}: CampaignCardProps) => {
  const box = createRef<HTMLLIElement>();
  const [funds, target, percentage] = useMemo(() => {
    const funds = Number(campaign.totalAmount), target = Number(campaign.targetAmount);
    return [funds, target, funds/target*100]
  }, [campaign]);

  const handleClick = () => {
    if (!box.current) return;
    
    const current = box.current.getBoundingClientRect();
    onClick({
      campaignTitle: campaign.title,
      cardCenter: {
        x: current.x + current.width/2,
        y: current.y + current.height/2,
      }
    })
  };

  return <li className={card} onClick={handleClick} ref={box}>
    { !isActive && <button>
      <h3>{campaign.title}</h3>
      <footer>
        <h4><span className={gradientText}>{funds}</span> / {target} ETH raised</h4>
        <div id={bar}>
          <div id={progress} className={gradientBar} style={{width: `${percentage}%`}}></div>
        </div>
        <h5 className={gradientText}>{percentage}% funded</h5>
      </footer>
    </button> }
  </li>;
}
