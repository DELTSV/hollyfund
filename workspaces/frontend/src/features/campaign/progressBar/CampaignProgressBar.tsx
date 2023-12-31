import { useMemo } from "react";
import style from "./style.module.css";
import { utilsStyle } from "../../../utils";
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
    <h4><span className={utilsStyle.gradientText}>{funds}</span> / {target} ETH raised</h4>
    <div className={style.bar}>
      <div className={utilsStyle.gradientBar} style={{opacity: lightOpacity}}></div>
      <div>
        <div className={utilsStyle.gradientBar} style={{width: `${percentage}%`}}></div>
      </div>
    </div>
    { big ? 
      <h4 className={utilsStyle.gradientText}>{percentage}% funded</h4> :
      <h5 className={utilsStyle.gradientText}>{percentage}% funded</h5>
    }
  </section>;
}