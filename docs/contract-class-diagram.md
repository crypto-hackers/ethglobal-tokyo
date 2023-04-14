classDiagram
    class ERC721 {
    }
    class SBT {
        -_verificationData: mapping(uint=>VerificationData)
        -_hasMinted: mapping(address=>bool)
        -_tokenIdCounter: Counters.Counter
        +mint(to: address): void
        +getVerificationData(tokenId: uint256): VerificationData
        +getVerificationDataByAddress(account: address): VerificationData
        +updateVerificationData(tokenId: uint256, isTwitterVerified: bool, isDiscordVerified: bool, isEmailVerified: bool, isKYCVerified: bool, isWorldIdVerified: bool, isPolygonIdVerified: bool, twitterID: string, discordID: string, emailAddress: string, worldId: string, polygonId: string): void
        +getTwitterVerificationStatus(account: address): bool
        +(other view functions...)
    }
    class VerificationData {
        bool isTwitterVerified
        bool isDiscordVerified
        bool isEmailVerified
        bool isKYCVerified
        bool isWorldIdVerified
        bool isPolygonIdVerified
        string twitterID
        string discordID
        string emailAddress
        string worldId
        string polygonId
    }
    ERC721 <|-- SBT
