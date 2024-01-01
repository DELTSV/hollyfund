import {abi} from "../context/abi.json";
const campaignContractAbi = [...abi] as const;
const contractAddress = "0xBcCC4e83B0F5AdC3DED5eB392b022225E3450557";

export * from './CampaignContextWrapper.tsx';
export {campaignContractAbi, contractAddress};