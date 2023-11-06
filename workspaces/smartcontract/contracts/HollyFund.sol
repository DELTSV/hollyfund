// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HollyFund is ERC20 {
    event NewCampaign(string name, uint targetAmount);

    event NewInvestment(string name, uint investAmount);

    struct Campaign {
        string title;
        uint totalAmount;
        uint targetAmount;
    }

    struct Investment {
        address investor;
        uint amount;
    }

    constructor(uint256 initialSupply) ERC20("Dollar", "USD") {
        _mint(msg.sender, initialSupply);
    }

    mapping (string => address) public campaignToProducer;
    mapping (string => Campaign) public campaigns;
    mapping (string => mapping (address => uint)) public campaignToInvestments;

    function createCampaign(string calldata _name, uint _targetAmount) public {
        require(_targetAmount != 0, "Target amount must be greater than 0");

        campaigns[_name] = Campaign(_name, 0, _targetAmount);
        campaignToProducer[_name] = msg.sender;
        emit NewCampaign(_name, _targetAmount);
    }

    function invest(string calldata _name) public payable {
        Campaign storage campaign = campaigns[_name];
        campaign.totalAmount += msg.value;
        campaignToInvestments[_name][msg.sender] += msg.value;

        this.transferFrom(msg.sender, address(this), msg.value);

        emit NewInvestment(_name, msg.value);
    }

    function getCampaign(string calldata _name) public view returns (string memory, uint) {
        Campaign storage campaign = campaigns[_name];

        require(campaign.targetAmount != 0, "Campaign does not exist");

        return (campaign.title, campaign.targetAmount);
    }

    function getInvestment(string calldata _name) public view returns (uint) {
        return campaignToInvestments[_name][msg.sender];
    }

    function getCompletion(string calldata _name) public view returns (uint) {
        Campaign storage campaign = campaigns[_name];
        return campaign.totalAmount * 100 / campaign.targetAmount;
    }
}
