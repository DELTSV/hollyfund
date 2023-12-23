import {Campaign, CampaignProgressBar, SelectedCampaign} from "../";
import {createRef, useMemo} from "react";
import style from "./style.module.css";
import { style as utilsStyle } from "../../../utils";

type Props = {
  isActive: boolean;
  campaign: Campaign;
  onClick: (card: SelectedCampaign) => void;
}

export const CampaignCard = ({isActive, campaign, onClick}: Props) => {
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
      campaignCard: {
        x: current.x + current.width/2,
        y: current.y + current.height/2,
      }
    })
  };

  return <li className={style.card} onClick={handleClick} ref={box}>
    {!isActive && <button>
      <h3>{campaign.title}</h3>
      <footer>
        <h4><span className={utilsStyle.gradientText}>{funds}</span> / {target} ETH raised</h4>
        <CampaignProgressBar progressionPercentage={percentage}/>
      </footer>
    </button>}
  </li>;
}
