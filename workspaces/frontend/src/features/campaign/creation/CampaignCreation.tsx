import { useState } from "react";
import { gradientStyle } from "../../../components/styles"
import style from "./style.module.css"
import { CampaignCreationDialog } from "./CampaignCreationDialog";

export const CampaignCreation = () => {
  const [showCreationDialog, setShowCreationDialog] = useState(false);

  const handleCreateButtonClick = () => setShowCreationDialog(true);
  const handleDialogClose = () => setShowCreationDialog(false);
  
  return <>
    <button
      className={`${gradientStyle.button} ${style.button}`}
      onClick={handleCreateButtonClick}
    >
      Create your campaign
    </button>
    <CampaignCreationDialog open={showCreationDialog} onClose={handleDialogClose}/>
  </>;
}