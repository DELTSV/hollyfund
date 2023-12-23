import {CampaignList, CampaignContextWrapper, CampaignDetails} from "../";
import style from "./style.module.css"

export const CampaignSection = () => 
  <section className={style.section}>
    <CampaignContextWrapper>
      <CampaignList/>
      <CampaignDetails/>
    </CampaignContextWrapper>
  </section>;