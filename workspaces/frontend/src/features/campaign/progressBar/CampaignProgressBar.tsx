import { useMemo } from "react";
import style from "./style.module.css";
import { gradientStyle } from "../../../components/styles";
import { Campaign, useCampaignFundStats } from "..";
import Web3 from "web3";

type Props = {
  campaign: Campaign | undefined;
  big?: boolean;
}

export const CampaignProgressBar = ({campaign, big}: Props) => {
  const {funds, target, percentage} = useCampaignFundStats(campaign)
  const lightOpacity = useMemo(
    () => Math.min(Math.max((Number(percentage) - 100) / 200, 0), 1),
    [percentage]
  );
  
  const formatAmount = (amount: bigint | number) => amount > 100000000000000 ?
    `${Number(Web3.utils.fromWei(amount, "ether")).toFixed(4)} ETH` :
    `${amount} WEI`

  const formattedFunds = useMemo(() => formatAmount(funds ?? 0), [funds])
  const formattedTarget = useMemo(() => formatAmount(target ?? 0), [target])

  return <section className={style.progression}>
    <h4><span className={gradientStyle.text}>{formattedFunds}</span> / {formattedTarget} raised</h4>
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