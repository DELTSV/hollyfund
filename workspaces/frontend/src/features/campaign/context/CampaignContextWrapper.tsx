import {createContext, ReactNode, useEffect, useMemo, useState} from "react";
import {Campaign} from "../types";
import {useSDK} from "@metamask/sdk-react";
import {Web3} from "web3";
import {campaignContractAbi} from "./index.ts";

type ContextCampaignsList = Campaign[] | undefined | null;

export type CampaignContextType = {
  campaigns?: ContextCampaignsList,
}

export const CampaignContext = createContext<CampaignContextType>({
  campaigns: undefined,
});

type Props = {
  children: ReactNode
}

export const CampaignContextWrapper = ({children}: Props) => {
  const {account, provider} = useSDK();
  const [campaigns, setCampaigns] = useState<ContextCampaignsList>(undefined);

  const contract = useMemo(
    () => {
      if (!account || !provider) return;

      const web3 = new Web3({
        provider,
        config: {
          contractDataInputFill: "both"
        }
      });
      return new web3.eth.Contract(
        campaignContractAbi,
        "0xBcCC4e83B0F5AdC3DED5eB392b022225E3450557",
        {gas: "3000000"}
      )
    },
    [account, provider]
  );

  const updateCampaignsList = () => {
    if (!contract || !account) return;

    contract.methods.getAllCampaigns().call({from: account}).then(
      data => setCampaigns(data as Campaign[]),
      _error => setCampaigns(null),
    )
  }

  useEffect(() => {
    if (contract && account && campaigns === undefined) {
      updateCampaignsList()
    }
  }, [contract, account]);

  return <CampaignContext.Provider value={{campaigns}}>
    {children}
  </CampaignContext.Provider>;
}