// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SBT is ERC721, Ownable {
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

    function mint(address to) public onlyOwner {
        require(!_hasMinted[to], "SBT: The destination address already has an SBT token");
        _mint(to, _tokenIdCounter.current());
        _verificationData[_tokenIdCounter.current()] = VerificationData(false, false, false, false, false, false, "", "", "", "", "");
        _hasMinted[to] = true;
        _tokenIdCounter.increment();
    }

    // Other functions...
}
