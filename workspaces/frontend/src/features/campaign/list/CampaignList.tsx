import {Web3} from "web3";
import {useSDK} from "@metamask/sdk-react";
import {campaignContractAbi} from "../contract";

export const CampaignList = () => {
  const {account, provider} = useSDK();

  const createCampaign = async () => {
    if (!account || !provider) return;

    await window.ethereum?.request({
      "method": "wallet_getPermissions",
      "params": []
    });

    const web3 = new Web3({
      provider,
      config: {
        contractDataInputFill: "both"
      }
    })
    const contract = new web3.eth.Contract(
      campaignContractAbi,
      "0xBcCC4e83B0F5AdC3DED5eB392b022225E3450557",
      {gas: "3000000"})

    contract
      .methods
      .createCampaign("auguste", "220")
      .send({from: account});
  }

  return <>
    <p>this is campaign list</p>
    <button onClick={createCampaign}>create campaign</button>
  </>;
}