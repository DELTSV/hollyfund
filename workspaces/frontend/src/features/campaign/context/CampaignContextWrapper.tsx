import {createContext, ReactNode, useEffect, useMemo, useState} from "react";
import {useSDK} from "@metamask/sdk-react";
import {Contract, Web3} from "web3";
import {campaignContractAbi} from ".";

export type CampaignContextType = {
  contract?: Contract<any>;
  account?: string;
}

export const CampaignContext = createContext<CampaignContextType>({});

type Props = {
  children: ReactNode
}

export const CampaignContextWrapper = ({children}: Props) => {
  const {account, provider} = useSDK();
  const [isCryptoReady, setIsCryptoReady] = useState(false);

  useEffect(() => {
    if (!provider) return;

    provider.request({
      method: "wallet_getPermissions",
      params: []
    }).then(
      _onFulfilled => setIsCryptoReady(true),
      _onRejected => setIsCryptoReady(false),
    )
  }, [provider]);

  const contract = useMemo(
    () => {
      if (!account || !provider || !isCryptoReady) return;

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
    [account, provider, isCryptoReady]
  );

  return <CampaignContext.Provider value={{contract, account}}>
    {children}
  </CampaignContext.Provider>;
}