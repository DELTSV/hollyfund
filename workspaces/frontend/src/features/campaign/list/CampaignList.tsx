import {useContext} from "react";
import {CampaignContext} from "../context";
import {CampaignCard, CampaignCreation} from "../";
import style from "./style.module.css";
import {gradientStyle} from "../../../components/styles"

export const CampaignList = () => {
  const {campaigns, selectedCampaign, selectCampaign} = useContext(CampaignContext);
  

  if (campaigns === undefined) return <h2 className={style.title}>We are loading campaigns list</h2>;
  else if (campaigns === null) return <h2 className={style.title}>We have trouble loading campaign list</h2>;
  else if (campaigns.length === 0) return <h2 className={style.title}>We have trouble loading campaign list</h2>;
  return <>
    <header className={style.header}>
      <h2 className={style.title}>Explore <span className={gradientStyle.text}>{campaigns.length} projects</span></h2>
      <CampaignCreation/>
    </header>
    <ul className={style.list}>
      {campaigns.map(campaign =>
        <CampaignCard
          key={campaign.title}
          campaign={campaign}
          isActive={selectedCampaign?.campaignTitle === campaign.title}
          onClick={card => selectCampaign?.(card)}
        />
      )}
    </ul>
  </>;
}