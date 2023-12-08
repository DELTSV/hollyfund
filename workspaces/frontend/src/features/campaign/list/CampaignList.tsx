import {useContext} from "react";
import {CampaignContext} from "../context";
import {CampaignCard} from "../";

export const CampaignList = () => {
  const {campaigns} = useContext(CampaignContext);

  if (campaigns === undefined) return <p>We are loading campaigns list</p>;
  else if (campaigns === null) return <p>We have trouble loading campaign list</p>;
  else if (campaigns.length === 0) return <p>We have trouble loading campaign list</p>;
  return <>
    <h2>Explore <span>{campaigns.length} projects</span></h2>
    <ul>
      {campaigns.map(campaign =>
        <CampaignCard
          key={campaign.title}
          campaign={campaign}
          onClick={_ => {}}
        />
      )}
    </ul>
  </>;
}