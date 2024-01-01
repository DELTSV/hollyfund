import {CampaignList, CampaignContextWrapper, CampaignDetails, CampaignInvest} from "../";
import style from "./style.module.css"

export const CampaignSection = () => 
  <section className={style.section}>
    <CampaignContextWrapper>
      <CampaignList/>
      <CampaignDetails/>
      <CampaignInvest/>
    </CampaignContextWrapper>
  </section>;