import { useContext, useEffect, useState } from "react";
import { CampaignContext, CampaignProgressBar } from "..";
import { Web3Context } from "../../web3";
import { Dialog, dialogStyle } from "../../../components/dialog";
import { CampaignDetailsContribution } from "./CampaignDetailsContribution";
import { CampaignDetailsClaiming } from "./CampaignDetailsClaiming";
import { CampaignDetailsPossessionTag } from "./CampaignDetailsPossessionTag";
import { CampaignDetailsDoneTag } from "./CampaignDetailsDoneTag";

export const CampaignDetails = () => {
  const {selectedCampaign, unselectCampaign, getCampaign, setCampaignToInvest, retrieveCampaignInvestment} = useContext(CampaignContext);
  const campaign = getCampaign?.(selectedCampaign?.campaignTitle ?? "");
  const {updateBalance, userAddress} = useContext(Web3Context);
  const [shouldClose, setShouldClose] = useState(false);

  useEffect(() => {
    if (!updateBalance || !selectedCampaign) return;
    updateBalance();
  }, [selectedCampaign, updateBalance])

  const closeDialog = () => {
    unselectCampaign?.();
    setShouldClose(false);
  }

  const handleInvestmentButtonClick = () => {
    if (!selectedCampaign) return;
    setCampaignToInvest?.(selectedCampaign.campaignTitle);
    setShouldClose(true);
  }
  
  const handleClaimButtonClick = () => {
    if (!campaign) return;
    retrieveCampaignInvestment?.(campaign.title);
    setShouldClose(true);
  }

  return <Dialog
    onClose={closeDialog}
    open={!!selectedCampaign}
    shouldClose={shouldClose}
    poppingOrigin={{
      x: selectedCampaign?.campaignCard?.x ?? 0,
      y: selectedCampaign?.campaignCard?.y ?? 0,
    }}
  >
    <section className={dialogStyle.horizontal}>
      <h1>{campaign?.title}</h1>
      <CampaignDetailsPossessionTag campaignProducer={campaign?.producer??""}/>
      <CampaignDetailsDoneTag completed={campaign?.completed??false}/>
    </section>
    <section>
      <CampaignProgressBar campaign={campaign} big/>
    </section>
    { userAddress?.toLowerCase() !== campaign?.producer.toLowerCase() ?
      <CampaignDetailsContribution onInvestmentClick={handleInvestmentButtonClick} completed={campaign?.completed ?? false}/> :
      <CampaignDetailsClaiming onClaimClick={handleClaimButtonClick}  funds={campaign?.totalAmount ?? 0} target={campaign?.targetAmount ?? 0}  completed={campaign?.completed ?? false}/>
    }
  </Dialog>;
}