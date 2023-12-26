import { useContext } from "react";
import { CampaignContext, CampaignProgressBar } from "..";
import style from "./style.module.css";
import { CampaignDetailsAnimation } from "./CampaignDetailsAnimation";

export const CampaignDetails = () => {
  const {selectedCampaign, unselectCampaign, getCampaign} = useContext(CampaignContext);
  const campaign = getCampaign?.(selectedCampaign?.campaignTitle ?? "");

  if (!selectedCampaign) return null;
  return <>
    <CampaignDetailsAnimation x={selectedCampaign.campaignCard?.x} y={selectedCampaign.campaignCard?.y}/>
    <dialog className={style.details} onClick={unselectCampaign} open>
      <article onClick={e => e.stopPropagation()}>
        <header>
          <h1>{selectedCampaign.campaignTitle}</h1>
          <CampaignProgressBar campaign={campaign} big/>
        </header>
        <section>
          {/* add description later */}
        </section>
      </article>
    </dialog>
  </>;
}