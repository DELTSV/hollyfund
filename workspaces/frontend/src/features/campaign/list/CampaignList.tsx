import {useContext} from "react";
import {CampaignContext} from "../context";

export const CampaignList = () => {
  const {contract, account} = useContext(CampaignContext);

  const createCampaign = () => {
    if (!account || !contract) return;

    contract
      .methods
      .createCampaign("bob", 220)
      .send({from: account});
  }

  return <>
    <p>this is campaign list</p>
    <button onClick={createCampaign}>create campaign</button>
  </>;
}