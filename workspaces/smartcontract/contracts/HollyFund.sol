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
        bool exists;
    }

    struct Investment {
        address investor;
        uint amount;
    }

    modifier isCampaignExists(string calldata _name) {
        require(campaigns[_name].exists == true, "Campaign does not exist");
        _;
    }

    modifier isCampaignAlreadyExists(string calldata _name) {
        require(campaigns[_name].exists == false, "Campaign already exists");
        _;
    }

    modifier isCampaignCompleted(string calldata _name) {
        require(campaigns[_name].totalAmount >= campaigns[_name].targetAmount, "Campaign is not completed");
        _;
    }

    constructor(uint256 initialSupply) ERC20("Dollar", "USD") {
        _mint(msg.sender, initialSupply);
    }

    mapping (string => address) public campaignToProducer;
    mapping (string => Campaign) public campaigns;
    mapping (string => mapping (address => uint)) public campaignToInvestments;

    function _isProducer(string calldata _name) internal returns (bool) {
        return campaignToProducer[_name] == msg.sender;
    }

    function createCampaign(string calldata _name, uint _targetAmount) public isCampaignAlreadyExists(_name) {
        require(_targetAmount != 0, "Target amount must be greater than 0");

        campaigns[_name] = Campaign(_name, 0, _targetAmount, true);
        campaignToProducer[_name] = msg.sender;
        emit NewCampaign(_name, _targetAmount);
    }

    function invest(string calldata _name) public isCampaignExists(_name) payable {
        require(_isProducer(_name) == false, "Producer cannot invest");

        Campaign storage campaign = campaigns[_name];

        campaign.totalAmount += msg.value;
        campaignToInvestments[_name][msg.sender] += msg.value;

        this.transferFrom(msg.sender, address(this), msg.value);

        emit NewInvestment(_name, msg.value);
    }

    function getCampaign(string calldata _name) public isCampaignExists(_name) view returns (string memory, uint) {
        Campaign storage campaign = campaigns[_name];
        return (campaign.title, campaign.targetAmount);
    }

    function getInvestment(string calldata _name) public isCampaignExists(_name) view returns (uint) {
        return campaignToInvestments[_name][msg.sender];
    }

    function getCompletion(string calldata _name) public isCampaignExists(_name) view returns (uint) {
        Campaign storage campaign = campaigns[_name];
        return campaign.totalAmount * 100 / campaign.targetAmount;
    }

    function claim(string calldata _name) public isCampaignExists(_name) isCampaignCompleted(_name) {
        require(_isProducer(_name) == true, "Only producer can claim");

        uint amount = campaignToInvestments[_name][msg.sender];
        campaignToInvestments[_name][msg.sender] = 0;

        this.transfer(msg.sender, amount);
    }
}
