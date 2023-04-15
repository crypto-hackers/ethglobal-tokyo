// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SBT.sol";

contract RestrictedERC20 is ERC20, Ownable {
    SBT private _sbtContract;
    address public uniswapPair;
    bool private _transferRestrictionsEnabled; 
    mapping(string => bool) private _claimedWorldIds;

    uint256 private constant AIRDROP_AMOUNT = 10 * 10**18;

    constructor(address sbtContractAddress) ERC20("Restricted ERC20 Token", "REST") {
        _sbtContract = SBT(sbtContractAddress);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(isWorldIdVerified(to), "REST: Address must be KYC verified to mint tokens");
        _mint(to, amount);
    }

    function enableTransferRestrictions() public onlyOwner {
        _transferRestrictionsEnabled = true;
    }

    function updateUniswapPair(address newUniswapPairAddress) public onlyOwner {
        uniswapPair = newUniswapPairAddress;
    }


    function claimAirdrop(address account) external {
        require(isWorldIdVerified(account), "REST: Account must have a verified world ID to claim airdrop");
        SBT.VerificationData memory data = _sbtContract.getBatchVerificationData(account);

        require(!_claimedWorldIds[data.worldId], "REST: Airdrop already claimed for this world ID");
        _claimedWorldIds[data.worldId] = true;

        _mint(account, AIRDROP_AMOUNT);
    }

    function isWorldIdVerified(address account) public view returns (bool) {
        SBT.VerificationData memory data = _sbtContract.getBatchVerificationData(account);
        return data.isWorldIdVerified;
    }

    function isKYCVerified(address account) public view returns (bool) {
        SBT.VerificationData memory data = _sbtContract.getBatchVerificationData(account);
        return data.isKYCVerified;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        super._beforeTokenTransfer(from, to, amount);

        if (_transferRestrictionsEnabled && from != address(0) && to != address(0)) {
            // Bypass the KYC check when interacting with the Uniswap pair
            if (from != uniswapPair && to != uniswapPair) {
                require(isWorldIdVerified(from), "REST: From address must be worldID verified");
                require(isWorldIdVerified(to), "REST: To address must be worldID verified");
            }
        }
    }
}