import {CampaignSection} from "./features/campaign";
import { Web3ContextWrapper } from "./features/web3";

export const App = () => <Web3ContextWrapper>
  <CampaignSection/>
</Web3ContextWrapper>;