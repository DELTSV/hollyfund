import { useSDK } from "@metamask/sdk-react"
import { DispatchWithoutAction, ReactNode, createContext, useEffect, useMemo, useState } from "react"
import Web3 from "web3"

type Web3ContextType = {
  web3?: Web3;
  userAddress?: string;
  balance?: bigint;
  updateBalance?: DispatchWithoutAction;
}

export const Web3Context = createContext<Web3ContextType>({})

type Props = {
  children: ReactNode
}

export const Web3ContextWrapper = ({children}: Props) => {
  const {provider, account} = useSDK();
  const web3 = useMemo(() => {
    if (!provider || !account) return undefined;

    window.ethereum?.request({
      "method": "wallet_getPermissions",
      "params": []
    });
    
    return new Web3({
      provider,
      config: {
        contractDataInputFill: "both"
      }
    });
  }, [provider, account])
  const [balance, setBalance] = useState<bigint | undefined>();

  const updateBalance = () => {
    if (!web3 || !account) return undefined;
    web3.eth.getBalance(account??"").then(
      data => setBalance(data),
      _error => setBalance(undefined),
    );
  };

  return <Web3Context.Provider value={{
    web3,
    balance,
    updateBalance,
    userAddress: account ?? ""
  }}>{children}</Web3Context.Provider>
}