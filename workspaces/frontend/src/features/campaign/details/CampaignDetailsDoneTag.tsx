import { gradientStyle } from "../../../components/styles";
import style from "./style.module.css";

type Props = {
  completed: boolean;
}

export const CampaignDetailsDoneTag = ({completed}: Props) => {
  if (!completed) return null;
  return <h4 className={`${gradientStyle.bar} ${style.doneTag}`}>This campaign is funded</h4>
}