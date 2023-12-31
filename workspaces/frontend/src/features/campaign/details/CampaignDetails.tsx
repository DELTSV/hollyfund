import { useContext, useEffect, useState } from "react";
import { CampaignContext, CampaignProgressBar } from "..";
import { Web3Context } from "../../web3";
import { gradientStyle } from "../../../components/styles";
import { Dialog, dialogStyle } from "../../../components/dialog";

export const CampaignDetails = () => {
  const {selectedCampaign, unselectCampaign, getCampaign} = useContext(CampaignContext);
  const campaign = getCampaign?.(selectedCampaign?.campaignTitle ?? "");
  const {updateBalance} = useContext(Web3Context);
  const [shouldClose, setShouldClose] = useState(false);

  useEffect(() => {
    if (!updateBalance || !selectedCampaign) return;
    updateBalance();
  }, [selectedCampaign, updateBalance])

  return <Dialog
    onClose={() => {
      unselectCampaign?.();
      setShouldClose(false);
    }}
    open={!!selectedCampaign}
    shouldClose={shouldClose}
    poppingOrigin={{
      x: selectedCampaign?.campaignCard?.x ?? 0,
      y: selectedCampaign?.campaignCard?.y ?? 0,
    }}
  >
    <section>
      <h1>{selectedCampaign?.campaignTitle}</h1>
      <CampaignProgressBar campaign={campaign} big/>
    </section>
    <section>
      <h2>Contribute</h2>
      <p>Support this cinematic journey and unlock potential royalties. Your commitment is key—no turning back once you pledge. Join us in making movie magic!</p>
      <button className={`${gradientStyle.button} ${dialogStyle.primary}`} onClick={() => setShouldClose(true)}>Back this project</button>
    </section>
  </Dialog>
}