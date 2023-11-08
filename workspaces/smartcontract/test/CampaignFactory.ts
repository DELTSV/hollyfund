import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("HollyFund", function () {
  async function deployOneYearLockFixture() {
    const title = "The Matrix";
    const targetAmount = ethers.parseEther("9000");
    const investAmount = ethers.parseEther("10");

    await ethers.provider.send("hardhat_reset", []);

    const [owner, otherAccount] = await ethers.getSigners();

    const HollyFund = await ethers.getContractFactory("HollyFund", owner);

    const contract = await HollyFund.deploy(300);

    await contract.waitForDeployment();

    await contract.createCampaign(title, targetAmount);

    return {contract, title, targetAmount, owner, otherAccount, investAmount};
  }

  describe('Create campaign', function () {
    it('should not create campaign', async () => {
      const {contract} = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(contract.createCampaign(
        "title",
        0
      )).to.be.revertedWith("Target amount must be greater than 0");
    });

    it('should not create campaign if it already exists', async () => {
      const {contract, title, targetAmount} = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(contract.createCampaign(
        title,
        targetAmount,
      )).to.be.revertedWith("Campaign already exists");
    });

    it('should create campaign', async () => {
      const {contract, targetAmount} = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(contract.createCampaign(
        "title",
        targetAmount
      )).to.not.be.reverted;
    });

    it("Should emit an event on create a campaign", async function () {
      const {targetAmount, contract} = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(contract.createCampaign("title", targetAmount))
        .to.emit(contract, "NewCampaign")
        .withArgs("title", targetAmount);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const {otherAccount, contract} = await loadFixture(
        deployOneYearLockFixture
      );

      await contract.transfer(otherAccount.address, 50);
      const otherAccountBalance = await contract.balanceOf(otherAccount.address);
      expect(otherAccountBalance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const {contract, owner, otherAccount} = await loadFixture(
        deployOneYearLockFixture
      );

      const initialOwnerBalance = await contract.balanceOf(owner.address);

      await expect(
        contract.connect(otherAccount).transfer(owner.address, 1)
      ).to.be.reverted;

      expect(await contract.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const {otherAccount, contract, owner} = await loadFixture(
        deployOneYearLockFixture
      );

      const initialOwnerBalance = await contract.balanceOf(owner.address);

      await contract.transfer(otherAccount.address, 100);


      const finalOwnerBalance = await contract.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - BigInt(100));

      const otherAccountBalance = await contract.balanceOf(otherAccount.address);
      expect(otherAccountBalance).to.equal(100);
    });
  });

  describe("Invest", function () {
    it("Should invest in a campaign", async function () {
      const {contract, title, investAmount, otherAccount} = await loadFixture(
        deployOneYearLockFixture
      );

      await contract.connect(otherAccount).approve(contract.getAddress(), investAmount);

      await expect(contract.connect(otherAccount).invest(title, {value: investAmount})).not.to.be.reverted;
    });

    it("Should pay invest amount", async function () {
      const {contract, title, investAmount, otherAccount} = await loadFixture(
        deployOneYearLockFixture
      );

      await contract.connect(otherAccount).approve(contract.getAddress(), investAmount);

      await expect(contract.connect(otherAccount).invest(title, {value: investAmount}))
        .to.emit(contract, "NewInvestment")
        .withArgs(title, investAmount);
    });

    it("Should retrieve the money from the sender", async function () {
      const {contract, title, otherAccount, investAmount, owner} = await loadFixture(
        deployOneYearLockFixture
      );

      const initialBalance = await otherAccount.provider.getBalance(otherAccount.getAddress());
      const target = initialBalance - BigInt(investAmount);

      const approve = await contract.connect(otherAccount).approve(contract.getAddress(), investAmount);
      const approveWait = await approve.wait();

      const gasUsedApprove = (approveWait?.gasUsed ?? 0n) * (approveWait?.gasPrice ?? 0n);

      const investment = await contract.connect(otherAccount).invest(title, {value: investAmount});
      const investmentWait = await investment.wait();

      const gasUsed = (investmentWait?.gasUsed ?? 0n) * (investmentWait?.gasPrice ?? 0n);

      expect(await otherAccount.provider.getBalance(otherAccount.getAddress())).to.be.eq(target - gasUsed - gasUsedApprove);
    });

    it("Should send the money to the contract", async function () {
      const {contract, title, otherAccount, investAmount} = await loadFixture(
        deployOneYearLockFixture
      );

      const initialBalance = await contract.balanceOf(contract.getAddress());

      await contract.connect(otherAccount).approve(contract.getAddress(), investAmount);
      await contract.connect(otherAccount).invest(title, {value: investAmount});

      expect(await contract.balanceOf(contract.getAddress())).to.be.eq(initialBalance + BigInt(investAmount));
    });
  });

  describe("Get all campaigns", function () {
    it("Should get all campaigns", async function () {
      const {contract, title} = await loadFixture(
        deployOneYearLockFixture
      );

      console.log(await contract.getAllCampaigns());

      // await expect(contract.getCampaigns())
      //   .to.emit(contract, "NewCampaign")
      //   .withArgs(title);
    });
  });

  describe("Get campaign", function () {
    it("Should not get a campaign", async function () {
      const {contract} = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(contract.getCampaign("title"))
        .to.be.revertedWith("Campaign does not exist");
    });

    it("Should get a campaign", async function () {
      const {contract, title} = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(contract.getCampaign(title))
        .not.to.be.reverted;
    });
  });

  describe("Claim funds", function () {
    it("Should not claim funds if campaign doesnt exists", async function () {
      const {contract} = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(contract.claim("title"))
        .to.be.revertedWith("Campaign does not exist");
    });

    it("Should not claim funds if campaign not completed", async function () {
      const {contract, title} = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(contract.claim(title))
        .to.be.revertedWith("Campaign is not completed");
    });

    it("Should not claim funds if im not the producer", async function () {
      const {contract, title, otherAccount, targetAmount} = await loadFixture(
        deployOneYearLockFixture
      );

      await contract.connect(otherAccount).approve(contract.getAddress(), targetAmount);

      await contract.connect(otherAccount).invest(title, {value: targetAmount});

      await expect(contract.connect(otherAccount).claim(title))
        .to.be.revertedWith("Only producer can claim");
    });

    it("Should claim funds", async function () {
      const {contract, title, otherAccount, targetAmount} = await loadFixture(
        deployOneYearLockFixture
      );

      await contract.connect(otherAccount).approve(contract.getAddress(), targetAmount);

      await contract.connect(otherAccount).invest(title, {value: targetAmount});

      await expect(contract.claim(title)).not.to.be.reverted;
    });

    it("Should transfert the money to the owner", async function () {
      const {contract, title, otherAccount, targetAmount, owner} = await loadFixture(
        deployOneYearLockFixture
      );

      const initialBalance = await owner.provider.getBalance(owner.getAddress());
      const target = initialBalance + targetAmount;

      await contract.connect(otherAccount).approve(contract.getAddress(), targetAmount);

      await contract.connect(otherAccount).invest(title, {value: targetAmount});
      const claimed = await contract.claim(title);
      const claimedWait = await claimed.wait();

      const gasUsed = (claimedWait?.gasUsed ?? 0n) * (claimedWait?.gasPrice ?? 0n);

      expect(await owner.provider.getBalance(owner.getAddress())).to.be.eq(target - gasUsed);
    });

    it("Should retrieve the money from the contract", async function () {
      const {contract, title, otherAccount, targetAmount} = await loadFixture(
        deployOneYearLockFixture
      );

      const initialBalance = await contract.balanceOf(contract.getAddress());

      await contract.connect(otherAccount).approve(contract.getAddress(), targetAmount);
      await contract.connect(otherAccount).invest(title, {value: targetAmount});

      await contract.claim(title);

      expect(await contract.balanceOf(contract.getAddress())).to.be.eq(initialBalance);
    });
  });
});
