import {abi} from "../context/abi.json";
const campaignContractAbi = [...abi] as const;

export * from './CampaignContextWrapper.tsx';
export {campaignContractAbi};