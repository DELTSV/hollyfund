import {useContext, useEffect, useState} from "react";
import {CampaignContext} from "../context";
import {Campaign} from "../types";

export const CampaignList = () => {
  const {contract, account} = useContext(CampaignContext);
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  console.log(campaigns);

  useEffect(() => {
    if (!contract) return;
    contract
      .methods
      .getAllCampaigns()
      .call()
      .then(fulfilled => setCampaigns(fulfilled as Campaign[]))
  }, [contract]);

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