import {CampaignList, CampaignContextWrapper, CampaignDetails} from "../";
import {section} from "./style.module.css"

export const CampaignSection = () => {
  return <section className={section}>
    <CampaignContextWrapper>
      <CampaignList/>
      <CampaignDetails/>
    </CampaignContextWrapper>
  </section>;
}