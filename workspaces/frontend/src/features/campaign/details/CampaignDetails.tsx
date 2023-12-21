import { useContext } from "react";
import { CampaignContext } from "..";

export const CampaignDetails = () => {
  const {selectedCampaign} = useContext(CampaignContext);

  if (!selectedCampaign) return null;
  return <dialog open>{selectedCampaign.campaignTitle}</dialog>;
}