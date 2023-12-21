import { useContext } from "react";
import { CampaignContext } from "..";
import { details } from "./style.module.css";

export const CampaignDetails = () => {
  const {selectedCampaign, unselectCampaign} = useContext(CampaignContext);

  if (!selectedCampaign) return null;
  return <>
    <style>{`
      @keyframes unzoom {
        from {
          top: ${selectedCampaign.campaignCard?.y}px;
          left: ${selectedCampaign.campaignCard?.x}px;
          max-width: 2rem;
          max-height: 2rem;
          border-radius: 100%;
          padding: 0;
          overflow: hidden;
        }
        to {
          top: 50%;
          left: 50%;
        }
      }

      .${details} article {
        animation: unzoom 0.3s;
        transition: 0.2s
      }

      .${details}:active article {
        top: ${selectedCampaign.campaignCard?.y}px;
        left: ${selectedCampaign.campaignCard?.x}px;
        max-width: 2rem;
        max-height: 2rem;
        border-radius: 100%;
        padding: 0;
        overflow: hidden;
      }
    `}</style>
    <dialog className={details} onClick={unselectCampaign} open>
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