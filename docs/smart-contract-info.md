Smartcontract is deployed here
https://mumbai.polygonscan.com/address/0x49c320c2fE782038277B9a185F1aE656F0E224cB#code

List of Methods

| Method Name                 | Argument(s)                                                                   | Returns                                 |
|-----------------------------|-------------------------------------------------------------------------------|-----------------------------------------|
| mint                        | address to                                                                    | None                                    |
| getVerificationDatabyTokenId| uint256 tokenId                                                               | VerificationData memory                |
| getBatchVerificationData    | address account                                                               | VerificationData memory                |
| getTwitterVerificationData  | address account                                                               | (bool, string memory)                  |
| getDiscordVerificationData  | address account                                                               | (bool, string memory)                  |
| getEmailVerificationData    | address account                                                               | (bool, string memory)                  |
| getWorldIdVerificationData  | address account                                                               | (bool, string memory)                  |
| getPolygonIdVerificationData| address account                                                               | (bool, string memory)                  |
| getKYCVerificationStatus    | address account                                                               | bool                                    |
| batchUpdateVerificationData | uint256 tokenId, VerificationData memory data                                | None                                    |
| updateTwitterData           | uint256 tokenId, bool isTwitterVerified, string memory twitterId             | None                                    |
| updateDiscordData           | uint256 tokenId, bool isDiscordVerified, string memory discordId             | None                                    |
| updateEmailData             | uint256 tokenId, bool isEmailVerified, string memory emailAddress            | None                                    |
| updateWorldIdData           | uint256 tokenId, bool isWorldIdVerified, string memory worldId               | None                                    |
| updatePolygonIdData         | uint256 tokenId, bool isPolygonIdVerified, string memory polygonId           | None                                    |
| updateKYCData               | uint256 tokenId, bool isKYCVerified                                          | None                                    |
