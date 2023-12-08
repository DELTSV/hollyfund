import {CampaignContextWrapper, CampaignList} from "./features/campaign";

export const App = () => {
  return <CampaignContextWrapper>
    <CampaignList/>
  </CampaignContextWrapper>;
}
