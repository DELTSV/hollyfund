import { useContext } from "react";
import { Web3Context } from "../../web3";
import { gradientStyle } from "../../../components/styles";
import style from "./style.module.css";

type Props = {
  campaignProducer: string;
}

export const CampaignCardPossessionTag = ({campaignProducer}: Props) => {
  const {userAddress} = useContext(Web3Context);

  if (userAddress?.toLowerCase() !== campaignProducer.toLowerCase()) return null;
  return <h4 className={`${gradientStyle.bar} ${style.possessionTag}`}>Your campaign</h4>
}