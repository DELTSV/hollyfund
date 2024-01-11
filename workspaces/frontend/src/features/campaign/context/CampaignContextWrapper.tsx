/* eslint-disable @typescript-eslint/ban-ts-comment */
import {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Campaign, SelectedCampaign} from "../types";
import {Web3Context} from "../../web3";
import {campaignContractAbi, contractAddress} from "./index.ts";
import {Web3} from "web3";

type ContextCampaignsList = Campaign[] | undefined | null;

export type CampaignContextType = {
  campaigns?: ContextCampaignsList,
  selectedCampaign?: SelectedCampaign,
  selectCampaign?: (campaign: SelectedCampaign) => void,
  unselectCampaign?: () => void,
  getCampaign?: (title: string) => Campaign | undefined,
  setCampaignToInvest?: (campaignName: string) => void,
  campaignToInvest?: string,
  createCampaign?: (campaignName: string, campaignTargetInETH: string) => void,
  invest?: (value: string) => void,
  cancelInvestment?: () => void,
  retrieveCampaignInvestment?: (campaignName: string) => void,
}

export const CampaignContext = createContext<CampaignContextType>({});

type Props = {
  children: ReactNode
}

export const CampaignContextWrapper = ({children}: Props) => {
  const {web3, userAddress} = useContext(Web3Context)
  const [campaigns, setCampaigns] = useState<ContextCampaignsList>(undefined);
  const [selectedCampaign, setSelectedCampaign] = useState<SelectedCampaign | undefined>()
  const [campaignToInvest, setCampaignToInvest] = useState<string | undefined>()

  const contract = useMemo(
    () => web3? 
      new web3.eth.Contract(campaignContractAbi, contractAddress, {gas: "3000000"}) :
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

  useEffect(() => {
    if (contract && userAddress && campaigns === undefined) {
      contract.events.NewCampaign().on("data", updateCampaignsList)
      contract.events.NewInvestment().on("data", updateCampaignsList)
      updateCampaignsList()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, userAddress]);

  const selectCampaign = (campaign: SelectedCampaign) => setSelectedCampaign(campaign);
  const unselectCampaign = () => setSelectedCampaign(undefined);
  const getCampaign = useCallback((title: string) => campaigns?.find(campaign => campaign.title === title), [campaigns]);

  const createCampaign = (campaignName: string, campaignTargetInETH: string) => {
    if (!contract || !userAddress) return;
    // @ts-ignore
    contract.methods.createCampaign(campaignName, Web3.utils.toWei(campaignTargetInETH, "ether")).send({ from: userAddress });
  };
  const cancelInvestment = () => setCampaignToInvest(undefined);
  const invest = (value: string) => {
    if (!campaignToInvest || !contract || !userAddress) return;
    // @ts-ignore
    contract.methods.approve(contractAddress, value).send({ from: userAddress });
    // @ts-ignore
    contract.methods.invest(campaignToInvest).send({ from: userAddress, value: value });
  };
  const retrieveCampaignInvestment = (campaignName: string) => {
    if (!contract || !userAddress) return;
    // @ts-ignore
    contract.methods.claim(campaignName).send({ from: userAddress });
  }


  return <CampaignContext.Provider value={{
    campaigns,
    selectedCampaign,
    selectCampaign,
    unselectCampaign,
    getCampaign,
    setCampaignToInvest,
    campaignToInvest,
    createCampaign,
    invest,
    cancelInvestment,
    retrieveCampaignInvestment
  }}>
    {children}
  </CampaignContext.Provider>;
}