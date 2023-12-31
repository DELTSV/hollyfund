import { useMemo } from "react";
import style from "./style.module.css";
import { gradientStyle } from "../../../components/styles";
import { Campaign, useCampaignFundStats } from "..";

type Props = {
  campaign: Campaign | undefined;
  big?: boolean;
}

export const CampaignProgressBar = ({campaign, big}: Props) => {
  const {funds, target, percentage} = useCampaignFundStats(campaign)
  const lightOpacity = useMemo(
    () => Math.min(Math.max((percentage - 100) / 100, 0), 1),
    [percentage]
  );

  return <section className={style.progression}>
    <h4><span className={gradientStyle.text}>{funds}</span> / {target} ETH raised</h4>
    <div className={style.bar}>
      <div className={gradientStyle.bar} style={{opacity: lightOpacity}}></div>
      <div>
        <div className={gradientStyle.bar} style={{width: `${percentage}%`}}></div>
      </div>
    </div>
    { big ? 
      <h4 className={gradientStyle.text}>{percentage}% funded</h4> :
      <h5 className={gradientStyle.text}>{percentage}% funded</h5>
    }
  </section>;
}