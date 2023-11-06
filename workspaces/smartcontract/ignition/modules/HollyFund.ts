import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("HollyFund", (m) => {
  const hollyFund = m.contract("HollyFund", [10]);
  return { hollyFund };
});
