import { ChangeEvent, useMemo, useContext, useState } from "react";
import { Web3Context } from "../../web3";
import { Web3 } from "web3";
import style from "./style.module.css";
import { utilsStyle } from "../../../utils";

export const CampaignInvest = () => {
  const {balance} = useContext(Web3Context);
  const [investment, setInvestment] = useState(0);

  const formatAmount = (amount: bigint | number) => 
    Number(Web3.utils.fromWei(amount, "ether")).toFixed(4)

  const formattedInvestment = useMemo(() => formatAmount(investment), [investment])
  const formattedBalance = useMemo(() => formatAmount(balance ?? 0), [balance])

  const handleInvestmentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInvestment(e.target.valueAsNumber);

  return <section className={style.invest}>
    <div className={style.slider}>
      <label>{formattedInvestment}<span className={utilsStyle.gradientText}>eth</span></label>
      <input
        type="range"
        min={0}
        max={Number(balance)}
        value={investment}
        onChange={handleInvestmentChange}
      />
      <label>{formattedBalance}<span className={utilsStyle.gradientText}>eth</span></label>
    </div>
    <button>Commit Funds</button>
  </section>;
}