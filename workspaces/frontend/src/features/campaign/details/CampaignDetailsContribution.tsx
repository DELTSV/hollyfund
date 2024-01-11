import { dialogStyle } from "../../../components/dialog";
import { gradientStyle } from "../../../components/styles";

type Props = {
  onInvestmentClick: () => void;
  completed: boolean
}

export const CampaignDetailsContribution = ({onInvestmentClick, completed}: Props) => <section>
  <details>
    <summary className={gradientStyle.text}>💓 Support a project you like</summary>
    <p>Support this cinematic journey and unlock potential royalties. Your commitment is key—no turning back once you pledge. Join us in making movie magic!</p>
  </details>
  <button className={`${gradientStyle.button} ${dialogStyle.primary}`} onClick={onInvestmentClick} disabled={completed}>{completed ? "This campaign is done" : "Back this project"}</button>
</section>;