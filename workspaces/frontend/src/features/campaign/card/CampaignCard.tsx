import {Campaign, CampaignProgressBar, SelectedCampaign} from "../";
import {createRef} from "react";
import style from "./style.module.css";
import { CampaignCardPossessionTag } from "./CampaignCardPossessionCard";

type Props = {
  isActive: boolean;
  campaign: Campaign;
  onClick: (card: SelectedCampaign) => void;
}

export const CampaignCard = ({isActive, campaign, onClick}: Props) => {
  const box = createRef<HTMLLIElement>();

  const handleClick = () => {
    if (!box.current) return;
    
    const current = box.current.getBoundingClientRect();
    onClick({
      campaignTitle: campaign.title,
      campaignCard: {
        x: current.x + current.width/2,
        y: current.y + current.height/2,
      }
    })
  };

  return <li className={style.card} onClick={handleClick} ref={box}>
    {!isActive && 
      <button>
        <h3>{campaign.title}</h3>
        <CampaignProgressBar campaign={campaign}/>
        <CampaignCardPossessionTag campaignProducer={campaign.producer}/>
      </button>
    }
  </li>;
}
