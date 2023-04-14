// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SBT is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    struct VerificationData {
        bool isTwitterVerified;
        bool isDiscordVerified;
        bool isEmailVerified;
        bool isKYCVerified;
        bool isWorldIdVerified;
        bool isPolygonIdVerified;
        string twitterID;
        string discordID;
        string emailAddress;
        string worldId;
        string polygonId;
    }

    mapping(uint256 => VerificationData) private _verificationData;
    mapping(address => bool) private _hasMinted;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Verified SBT Token", "SBT") {}

    //Mint function
    function mint(address to) public onlyOwner {
        require(!_hasMinted[to], "SBT: The destination address already has an SBT token");
        _mint(to, _tokenIdCounter.current());
        _verificationData[_tokenIdCounter.current()] = VerificationData(false, false, false, false, false, false, "", "", "", "", "");
        _hasMinted[to] = true;
        _tokenIdCounter.increment();
    }

    //View functions
    function getVerificationDatabyTokenId(uint256 tokenId) public view returns (VerificationData memory) {
        return _verificationData[tokenId];
    }

    function getBatchVerificationData(address account) public view returns (VerificationData memory) {
        uint256 tokenId = tokenOfOwnerByIndex(account, 0);
        return getVerificationDatabyTokenId(tokenId);
    }

    function getTwitterVerificationData(address account) public view returns (bool, string memory) {
        uint256 tokenId = tokenOfOwnerByIndex(account, 0);
        return (_verificationData[tokenId].isTwitterVerified, _verificationData[tokenId].twitterID);
    }

    function getDiscordVerificationData(address account) public view returns (bool, string memory) {
        uint256 tokenId = tokenOfOwnerByIndex(account, 0);
        return (_verificationData[tokenId].isDiscordVerified, _verificationData[tokenId].discordID);
    }

    function getEmailVerificationData(address account) public view returns (bool, string memory) {
        uint256 tokenId = tokenOfOwnerByIndex(account, 0);
        return (_verificationData[tokenId].isEmailVerified, _verificationData[tokenId].emailAddress);
    }

    function getWorldIdVerificationData(address account) public view returns (bool, string memory) {
        uint256 tokenId = tokenOfOwnerByIndex(account, 0);
        return (_verificationData[tokenId].isWorldIdVerified, _verificationData[tokenId].worldId);
    }

    function getPolygonIdVerificationData(address account) public view returns (bool, string memory) {
        uint256 tokenId = tokenOfOwnerByIndex(account, 0);
        return (_verificationData[tokenId].isPolygonIdVerified, _verificationData[tokenId].polygonId);
    }

    function getKYCVerificationStatus(address account) public view returns (bool) {
        uint256 tokenId = tokenOfOwnerByIndex(account, 0);
        return _verificationData[tokenId].isKYCVerified;
    }

    //Write functions
    function batchUpdateVerificationData(uint256 tokenId, VerificationData memory data) external onlyOwner {
        _verificationData[tokenId] = data;
    }

    function updateTwitterData(uint256 tokenId, bool isTwitterVerified, string memory twitterId) external onlyOwner {
        VerificationData storage data = _verificationData[tokenId];
        data.isTwitterVerified = isTwitterVerified;
        data.twitterID = twitterId;
    }

    function updateDiscordData(uint256 tokenId, bool isDiscordVerified, string memory discordId) external onlyOwner {
        VerificationData storage data = _verificationData[tokenId];
        data.isDiscordVerified = isDiscordVerified;
        data.discordID = discordId;
    }

    function updateEmailData(uint256 tokenId, bool isEmailVerified, string memory emailAddress) external onlyOwner {
        VerificationData storage data = _verificationData[tokenId];
        data.isEmailVerified = isEmailVerified;
        data.emailAddress = emailAddress;
    }

    function updateWorldIdData(uint256 tokenId, bool isWorldIdVerified, string memory worldId) external onlyOwner {
        VerificationData storage data = _verificationData[tokenId];
        data.isWorldIdVerified = isWorldIdVerified;
        data.worldId = worldId;
    }

    function updatePolygonIdData(uint256 tokenId, bool isPolygonIdVerified, string memory polygonId) external onlyOwner {
        VerificationData storage data = _verificationData[tokenId];
        data.isPolygonIdVerified = isPolygonIdVerified;
        data.polygonId = polygonId;
    }

    function updateKYCData(uint256 tokenId, bool isKYCVerified) external onlyOwner {
        VerificationData storage data = _verificationData[tokenId];
        data.isKYCVerified = isKYCVerified;
    }

    //override functions
    function _beforeTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize) internal override(ERC721, ERC721Enumerable) {
        require(from == address(0) && to != address(0), "SBT: Tokens are non-transferable");
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
