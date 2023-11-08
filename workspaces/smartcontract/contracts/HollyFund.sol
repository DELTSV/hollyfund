// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HollyFund is ERC20 {
    event NewCampaign(string name, uint256 targetAmount);

    event NewInvestment(string name, uint256 investAmount);

    struct Campaign {
        string title;
        uint256 totalAmount;
        uint256 targetAmount;
        address producer;
        bool exists;
    }

    struct CampaignDto {
        string title;
        uint256 totalAmount;
        uint256 targetAmount;
        address producer;
    }

    struct Investment {
        address investor;
        uint256 amount;
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

    mapping (string => Campaign) public campaigns;
    mapping (string => mapping (address => uint256)) public campaignToInvestments;
    string[] private _campaignNames;

    function _isProducer(string calldata _name) internal returns (bool) {
        return campaigns[_name].producer == msg.sender;
    }

    function createCampaign(string calldata _name, uint256 _targetAmount) public isCampaignAlreadyExists(_name) {
        require(_targetAmount != 0, "Target amount must be greater than 0");

        campaigns[_name] = Campaign(_name, 0, _targetAmount, msg.sender, true);
        _campaignNames.push(_name);
        emit NewCampaign(_name, _targetAmount);
    }

    function invest(string calldata _name) public isCampaignExists(_name) payable {
        require(_isProducer(_name) == false, "Producer cannot invest");

        Campaign storage campaign = campaigns[_name];

        campaign.totalAmount += msg.value;
        campaignToInvestments[_name][msg.sender] += msg.value;

        _mint(msg.sender, msg.value);

        this.transferFrom(msg.sender, address(this), msg.value);

        emit NewInvestment(_name, msg.value);
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory campaignsArray = new Campaign[](_campaignNames.length);

        for (uint i = 0; i < _campaignNames.length; i++) {
            campaignsArray[i] = campaigns[_campaignNames[i]];
        }

        return campaignsArray;
    }

    function getCampaign(string calldata _name) public isCampaignExists(_name) view returns (string memory, uint256, uint256) {
        Campaign storage campaign = campaigns[_name];
        return (campaign.title, campaign.targetAmount, campaign.totalAmount);
    }

    function getInvestment(string calldata _name) public isCampaignExists(_name) view returns (uint256) {
        return campaignToInvestments[_name][msg.sender];
    }

    function getCompletion(string calldata _name) public isCampaignExists(_name) view returns (uint256) {
        Campaign storage campaign = campaigns[_name];
        return campaign.totalAmount * 100 / campaign.targetAmount;
    }

    function claim(string calldata _name) public isCampaignExists(_name) isCampaignCompleted(_name) {
        require(_isProducer(_name) == true, "Only producer can claim");

        uint256 amount = campaigns[_name].totalAmount;

        this.transfer(msg.sender, amount);

        payable(msg.sender).send(amount);
        _burn(msg.sender, amount);
    }
}
