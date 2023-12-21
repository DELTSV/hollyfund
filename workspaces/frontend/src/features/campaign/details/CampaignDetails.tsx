import { useContext } from "react";
import { CampaignContext } from "..";
import { details } from "./style.module.css";

export const CampaignDetails = () => {
  const {selectedCampaign, unselectCampaign} = useContext(CampaignContext);

  if (!selectedCampaign) return null;
  return <dialog className={details} onClick={unselectCampaign} open>
    <article onClick={e => e.stopPropagation()}>
      <header>
        <h1>{selectedCampaign.campaignTitle}</h1>
      </header>
      <section>
        <h1>{selectedCampaign.campaignTitle}</h1>
        <h1>{selectedCampaign.campaignTitle}</h1>
        <h1>{selectedCampaign.campaignTitle}</h1>
        <h1>{selectedCampaign.campaignTitle}</h1>
        <h1>{selectedCampaign.campaignTitle}</h1>
        <h1>{selectedCampaign.campaignTitle}</h1>
        <h1>{selectedCampaign.campaignTitle}</h1>
        <h1>{selectedCampaign.campaignTitle}</h1>
        <h1>{selectedCampaign.campaignTitle}</h1>
        <h1>{selectedCampaign.campaignTitle}</h1>
        <h1>{selectedCampaign.campaignTitle}</h1>
        <h1>{selectedCampaign.campaignTitle}</h1>
        <h1>{selectedCampaign.campaignTitle}</h1>
        <h1>{selectedCampaign.campaignTitle}</h1>
      </section>
    </article>
  </dialog>;
}