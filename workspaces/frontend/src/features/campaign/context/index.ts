import {abi} from "../context/abi.json";
const campaignContractAbi = [...abi] as const;
const contractAddress = "0x0cBD02feEB1Ad4f3dFda37A73862c2b7aE0cd62E";

export * from './CampaignContextWrapper.tsx';
export {campaignContractAbi, contractAddress};