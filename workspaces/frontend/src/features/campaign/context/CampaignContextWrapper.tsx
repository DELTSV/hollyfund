import {createContext, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import {Campaign, SelectedCampaign} from "../types";
import {useSDK} from "@metamask/sdk-react";
import {Web3} from "web3";
import {campaignContractAbi} from "./index.ts";

type ContextCampaignsList = Campaign[] | undefined | null;

export type CampaignContextType = {
  campaigns?: ContextCampaignsList,
  selectedCampaign?: SelectedCampaign,
  selectCampaign?: (campaign: SelectedCampaign) => void,
  unselectCampaign?: () => void,
  getCampaign?: (title: string) => Campaign | undefined
}

export const CampaignContext = createContext<CampaignContextType>({});

type Props = {
  children: ReactNode
}

export const CampaignContextWrapper = ({children}: Props) => {
  const {account, provider} = useSDK();
  const [campaigns, setCampaigns] = useState<ContextCampaignsList>(undefined);
  const [selectedCampaign, setSelectedCampaign] = useState<SelectedCampaign | undefined>()

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

  const selectCampaign = (campaign: SelectedCampaign) => setSelectedCampaign(campaign);
  const unselectCampaign = () => setSelectedCampaign(undefined);
  const getCampaign = useCallback((title: string) => campaigns?.find(campaign => campaign.title === title), [campaigns]);

  useEffect(() => {
    if (contract && account && campaigns === undefined) updateCampaignsList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, account]);

  return <CampaignContext.Provider value={{
    campaigns,
    selectedCampaign,
    selectCampaign,
    unselectCampaign,
    getCampaign,
  }}>
    {children}
  </CampaignContext.Provider>;
}