import {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Campaign, SelectedCampaign} from "../types";
import {Web3Context} from "../../web3";
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
  const {web3, userAddress} = useContext(Web3Context)
  const [campaigns, setCampaigns] = useState<ContextCampaignsList>(undefined);
  const [selectedCampaign, setSelectedCampaign] = useState<SelectedCampaign | undefined>()

  const contract = useMemo(
    () => web3? 
      new web3.eth.Contract(campaignContractAbi, "0xBcCC4e83B0F5AdC3DED5eB392b022225E3450557", {gas: "3000000"}) :
      undefined,
    [web3]
  );

  const updateCampaignsList = () => {
    if (!contract || !userAddress) return;

    contract.methods.getAllCampaigns().call({from: userAddress}).then(
      data => setCampaigns(data as Campaign[]),
      _error => setCampaigns(null),
    )
  }

  const selectCampaign = (campaign: SelectedCampaign) => setSelectedCampaign(campaign);
  const unselectCampaign = () => setSelectedCampaign(undefined);
  const getCampaign = useCallback((title: string) => campaigns?.find(campaign => campaign.title === title), [campaigns]);

  useEffect(() => {
    if (contract && userAddress && campaigns === undefined) updateCampaignsList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, userAddress]);

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