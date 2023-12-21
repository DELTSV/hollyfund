import {useContext, useState} from "react";
import {CampaignContext} from "../context";
import {CampaignCard, SelectedCard} from "../";
import {title, list} from "./style.module.css";
import {gradientText} from "../../../utils"

export const CampaignList = () => {
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null)
  const {campaigns} = useContext(CampaignContext);
  console.log(selectedCard)

  if (campaigns === undefined) return <h2 className={title}>We are loading campaigns list</h2>;
  else if (campaigns === null) return <h2 className={title}>We have trouble loading campaign list</h2>;
  else if (campaigns.length === 0) return <h2 className={title}>We have trouble loading campaign list</h2>;
  return <>
    <h2 className={title}>Explore <span className={gradientText}>{campaigns.length} projects</span></h2>
    <ul className={list}>
      {campaigns.map(campaign =>
        <CampaignCard
          key={campaign.title}
          campaign={campaign}
          isActive={selectedCard?.campaignTitle === campaign.title}
          onClick={card => setSelectedCard(card)}
        />
      )}
    </ul>
  </>;
}