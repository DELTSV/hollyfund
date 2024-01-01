import {CampaignList, CampaignContextWrapper, CampaignDetails, CampaignInvest} from "../";
import { gradientStyle } from "../../../components/styles";
import style from "./style.module.css"

export const CampaignSection = () => 
  <section className={style.section}>
    <h1 className={gradientStyle.text}>🫰 HOLLYFUND</h1>
    <CampaignContextWrapper>
      <CampaignList/>
      <CampaignDetails/>
      <CampaignInvest/>
    </CampaignContextWrapper>
  </section>;