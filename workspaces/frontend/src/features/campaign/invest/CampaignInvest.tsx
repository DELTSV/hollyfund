import { ChangeEvent, useMemo, useContext, useState } from "react";
import { Web3Context } from "../../web3";
import { Web3 } from "web3";
import style from "./style.module.css";
import { gradientStyle } from "../../../components/styles";
import { Dialog, dialogStyle } from "../../../components/dialog";
import { CampaignContext } from "..";

export const CampaignInvest = () => {
  const {balance} = useContext(Web3Context);
  const {cancelInvestment, campaignToInvest, invest} = useContext(CampaignContext);
  const [investment, setInvestment] = useState(0);
  const [shouldClose, setShouldClose] = useState(false);

  const formatAmount = (amount: bigint | number) => 
    Number(Web3.utils.fromWei(amount, "ether")).toFixed(4)

  const formattedInvestment = useMemo(() => formatAmount(investment), [investment])
  const formattedBalance = useMemo(() => formatAmount(balance ?? 0), [balance])

  const handleInvestmentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInvestment(e.target.valueAsNumber);

  const closeDialog = () => {
    cancelInvestment?.();
    setShouldClose(false);
  }
  const handleFundButtonClick = () => {
    invest?.(investment.toString())
    setShouldClose(true);
  }
  const handleCancelButtonClick = () => {
    setShouldClose(true);
  }

  return <Dialog
    onClose={closeDialog}
    open={!!campaignToInvest}
    shouldClose={shouldClose}
  >
    <section>
      <h2>Important informations before donating</h2>
      <details>
        <summary className={gradientStyle.text}>🚀 Invest with Confidence, Reap Rewards</summary>
        <p>Welcome to Hollyfund-where every contribution is a vote of confidence in innovation. By funding this project, you're not just a supporter; you're an investor with benefits! Here's what you need to know:</p>
      </details>
      <details>
        <summary className={gradientStyle.text}>✨ Royalties Await You</summary>
        <p>When you fund this project, you become a valued stakeholder in its success. As an investor, you'll receive royalties—your share of the project's financial success. Your support goes beyond a one-time contribution; it's an investment in a future where rewards are shared.</p>
      </details>
      <details>
        <summary className={gradientStyle.text}>🤚 No Turning Back</summary>
        <p>Please note that once you've committed to fund the project, it's a commitment we both take seriously. Due to the nature of crowdfunding and the immediate impact on project development, we cannot accommodate cancellations. Your contribution plays a crucial role in propelling the project forward.</p>
      </details>
      <details>
        <summary className={gradientStyle.text}>🌐 Join us on this Journey</summary>
        <p>We invite you to join us on this exciting journey of innovation and growth. Your belief in the project not only brings it to life but also positions you as a part of its success story.</p>
      </details>
    </section>
    <section>
      <h2>Select the amount you want to fund <span className={gradientStyle.text}>{campaignToInvest}</span></h2>
      <div className={style.slider}>
        <label>{formattedInvestment}<span className={gradientStyle.text}>eth</span></label>
        <input
          type="range"
          min={0}
          max={Number(balance)}
          value={investment}
          step={1}
          onChange={handleInvestmentChange}
        />
        <label>{formattedBalance}<span className={gradientStyle.text}>eth</span></label>
      </div>
    </section>
    <section className={dialogStyle.horizontal}>
      <button className={`${gradientStyle.button} ${dialogStyle.primary}`} disabled={!investment} onClick={handleFundButtonClick}>Commit Funds</button>
      <button className={`${gradientStyle.buttonSecondary} ${dialogStyle.secondary}`} onClick={handleCancelButtonClick}>Cancel Funding</button>
    </section>
  </Dialog>;
}