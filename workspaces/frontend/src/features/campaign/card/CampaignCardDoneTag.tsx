import { gradientStyle } from "../../../components/styles";
import style from "./style.module.css";

type Props = {
  completed: boolean;
}

export const CampaignCardDoneTag = ({completed}: Props) => {
  if (!completed) return null;
  return <h4 className={`${gradientStyle.bar} ${style.doneTag}`}>Done</h4>
}