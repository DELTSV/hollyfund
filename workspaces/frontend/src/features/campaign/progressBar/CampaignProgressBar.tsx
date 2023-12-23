import { useMemo } from "react";
import style from "./style.module.css";
import { style as utilsStyle } from "../../../utils";

type Props = {
  progressionPercentage: number
}

export const CampaignProgressBar = ({progressionPercentage}: Props) => {
  const lightOpacity = useMemo(
    () => Math.min(Math.max((progressionPercentage - 100) / 100, 0), 1),
    [progressionPercentage]
  );

  return <section className={style.progression}>
    <div className={style.bar}>
      <div className={utilsStyle.gradientBar} style={{opacity: lightOpacity}}></div>
      <div>
        <div className={utilsStyle.gradientBar} style={{width: `${progressionPercentage}%`}}></div>
      </div>
    </div>
    <h5 className={utilsStyle.gradientText}>{progressionPercentage}% funded</h5>
  </section>;
}