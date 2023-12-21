import {CampaignList, CampaignContextWrapper} from "../";
import {section} from "./style.module.css"

export const CampaignSection = () => {
  return <section className={section}>
    <CampaignContextWrapper>
      <CampaignList/>
    </CampaignContextWrapper>
  </section>;
}