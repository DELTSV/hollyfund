import { useContext } from "react";
import { CampaignContext } from "..";
import style from "./style.module.css";
import { CampaignDetailsAnimation } from "./CampaignDetailsAnimation";

export const CampaignDetails = () => {
  const {selectedCampaign, unselectCampaign} = useContext(CampaignContext);

  if (!selectedCampaign) return null;
  return <>
    <CampaignDetailsAnimation x={selectedCampaign.campaignCard?.x} y={selectedCampaign.campaignCard?.y}/>
    <dialog className={style.details} onClick={unselectCampaign} open>
      <article onClick={e => e.stopPropagation()}>
        <header>
          <h1>{selectedCampaign.campaignTitle}</h1>
        </header>
        <section>
          <h1>{selectedCampaign.campaignTitle}</h1>
          <h1>{selectedCampaign.campaignTitle}</h1>
        </section>
      </article>
    </dialog>
  </>;
}