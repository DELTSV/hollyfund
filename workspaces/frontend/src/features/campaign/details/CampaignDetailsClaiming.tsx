import { dialogStyle } from "../../../components/dialog";
import { gradientStyle } from "../../../components/styles";

type Props = {
  onClaimClick: () => void;
  funds: number;
  target: number;
}

export const CampaignDetailsClaiming = ({onClaimClick, funds, target}: Props) => <section>
  <details>
    <summary className={gradientStyle.text}>🌟 Retrieve your funds the moment you need it</summary>
    <p>At Hollyfund, we empower you with control over your campaign funds. With our convenient retrieval feature, you can access your money at the exact moment your campaign attain or exceed 100% completion. Your funds, your way, whenever you need them. That's the freedom of fundraising with Hollyfund.</p>
  </details>
  <button className={`${gradientStyle.button} ${dialogStyle.primary}`} onClick={onClaimClick} disabled={funds < target}>Instant Fund Retrieval</button>
</section>;