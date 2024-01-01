import { useContext, useState } from "react";
import { Dialog, dialogStyle } from "../../../components/dialog";
import { gradientStyle } from "../../../components/styles";
import { CampaignContext } from "..";

type Props = {
  open: boolean;
  onClose: () => void;
}

export const CampaignCreationDialog = ({open, onClose}: Props) => {
  const {createCampaign} = useContext(CampaignContext);
  const [shouldClose, setShouldClose] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [campaignTargetInETH, setCampaignTargetInETH] = useState("");

  const closeDialog = () => setShouldClose(true);
  const handleCampaignCreation = () => {
    if (campaignName === "" || campaignTargetInETH === "") return;
    createCampaign?.(campaignName, campaignTargetInETH);
    setCampaignName("");
    setCampaignTargetInETH("");
    closeDialog();
  };

  return <Dialog open={open} onClose={onClose} shouldClose={shouldClose}>
    <section>
      <h1>Start a new adventure</h1>
      <details>
        <summary className={gradientStyle.text}>❓ How does a campaign work</summary>
        <details>
          <summary className={gradientStyle.text}>🚀 Invest with Confidence, Reap Rewards</summary>
          <p>Welcome to Hollyfund-where every contribution is a vote of confidence in innovation. By funding this project, you're not just a supporter; you're an investor with benefits! Here's what you need to know:</p>
        </details>
        <details>
          <summary className={gradientStyle.text}>✨ Royalties Await You</summary>
          <p>When you fund this project, you become a valued stakeholder in its success. As an investor, you'll receive royalties—your share of the project's financial success. Your support goes beyond a one-time contribution; it's an investment in a future where rewards are shared.</p>
        </details>
        <details>
          <summary className={gradientStyle.text}>🤚 No Turning Back</summary>
          <p>Please note that once you've committed to fund the project, it's a commitment we both take seriously. Due to the nature of crowdfunding and the immediate impact on project development, we cannot accommodate cancellations. Your contribution plays a crucial role in propelling the project forward.</p>
        </details>
        <details>
          <summary className={gradientStyle.text}>🌟 Retrieve your funds easily</summary>
          <p>At Hollyfund, we empower you with control over your campaign funds. With our convenient retrieval feature, you can access your money at the exact moment your campaign attain or exceed 100% completion. Your funds, your way, whenever you need them. That's the freedom of fundraising with Hollyfund.</p>
        </details>
        <details>
          <summary className={gradientStyle.text}>🌐 Join us on this journey</summary>
          <p>We invite you to join us on this exciting journey of innovation and growth. Your belief in the project not only brings it to life but also positions you as a part of its success story.</p>
        </details>
      </details>
    </section>
    <section className={dialogStyle.horizontal}>
      <label>
        <h3>Campaign name</h3>
        <input
          type={"text"}
          value={campaignName}
          onChange={e => setCampaignName(e.currentTarget.value)}
        />
      </label>
      <label>
        <h3>Target Funds</h3>
        <input 
          type={"number"}
          min={0}
          value={campaignTargetInETH}
          onChange={e => setCampaignTargetInETH(e.currentTarget.value)}
        />
        <h4 className={gradientStyle.text}>ETH</h4>
      </label>
    </section>
    <section className={dialogStyle.horizontal}>
      <button 
        className={`${gradientStyle.button} ${dialogStyle.primary}`} 
        disabled={campaignName === "" || campaignTargetInETH === ""}
        onClick={handleCampaignCreation}
      >
        Create campaign
      </button>
      <button 
        className={`${gradientStyle.buttonSecondary} ${dialogStyle.secondary}`}
        onClick={closeDialog}
      >
        Cancel creation
      </button>
    </section>
  </Dialog>;
}