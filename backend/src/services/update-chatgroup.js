// require("dotenv").config({ path: '../ethtokyo23-main/.env' });
// const { MUMBAI_ALCHEMY_KEY, POLYGON_ALCHEMY_KEY, MUMBAI_RPC, POLYGON_RPC, PRIVATE_KEY, POLYGONSCAN_KEY } = process.env;

// const PushAPI = require('@pushprotocol/restapi');
// const { ethers, Contract } = require('ethers');
// const ENV = require('@pushprotocol/restapi/src/lib/constants');
// const SBTABI = require('./SBT.json');

// // Replace with your private key and provider URL
// const privateKey = PRIVATE_KEY;
// const providerURL = `${MUMBAI_RPC}${MUMBAI_ALCHEMY_KEY}`;

// // Initialize the signer
// const provider = new ethers.providers.JsonRpcProvider(providerURL);
// const signer = new ethers.Wallet(privateKey, provider);

// // Replace with your desired group details
// const chatId = 'ddcd8c8c45d681223d0a344cfbbe679acc2c51198a96fc946ea2cf6793e1406d';
// const groupName = 'WorldIdChat';
// const groupDescription = 'This is the unofficial group for those who has their iris identified :)';
// const groupImage = 'https://pbs.twimg.com/profile_images/1609202951192559618/6CuvrABG_400x400.jpg';
// const members = [
//     // 'eip155:0x9e60c47edF21fa5e5Af33347680B3971F2FfD464',
//     // 'eip155:0xEE860E9d8eCBFfEa3D27Eb76E5B923C2E9488ACf'
// ];
// const admins = ['eip155:0x2EdD41ED862fad13D4820916256d38809f50E6CC'];
// const isPublic = true;
// const SBTAddress = 'eip155:80001:0x49c320c2fE782038277B9a185F1aE656F0E224cB';
// const SBTAddressInNormalFormat = '0x49c320c2fE782038277B9a185F1aE656F0E224cB';

async function updatePushGroup() {
// (async () => {
//     try {
//         // const user2 = await PushAPI.user.create({
//         //     // @ts-ignore
//         //     signer: signer,
//         //     env: 'staging'
//         //   })

//         const tokenContract = new Contract(
//             SBTAddressInNormalFormat,
//             SBTABI,
//             signer
//         );

//         // Get total supply
//         const totalSupply = await tokenContract.totalSupply();

//         // Fetch token holders using tokenByIndex
//         const tokenHolders = [];
//         for (let i = 0; i < totalSupply; i++) {
//             const tokenId = await tokenContract.tokenByIndex(i);
//             const verificationData = await tokenContract.getVerificationDatabyTokenId(tokenId);
//             const isWorldIdVerified = verificationData.isWorldIdVerified;
//             console.log(isWorldIdVerified);
//             if (isWorldIdVerified) {
//                 const owner = await tokenContract.ownerOf(tokenId);
//                 tokenHolders.push(`eip155:${owner}`);
//             }
//         }

//         // Add token holders to the members array
//         members.push(...tokenHolders);


//         const user = await PushAPI.user.get({
//             account: `eip155:${signer.address}`,
//             env: 'staging'
//         });


//         if (!user.encryptedPrivateKey) {
//             console.error('Encrypted private key not found in the user object');
//             return;
//         }

//         const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
//             encryptedPGPPrivateKey: user.encryptedPrivateKey,
//             signer: signer,
//             env: 'staging'
//         });

//         const response = await PushAPI.chat.updateGroup({
//             chatId,
//             groupName,
//             groupDescription,
//             members,
//             groupImage,
//             admins,
//             contractAddressNFT: SBTAddress,
//             numberOfNFTs: 1,
//             account: signer.address,
//             pgpPrivateKey: pgpDecryptedPvtKey,
//             env: 'staging',
//           });


//         // const response = await PushAPI.chat.createGroup({
//         //     groupName,
//         //     groupDescription,
//         //     members,
//         //     groupImage,
//         //     admins,
//         //     isPublic,
//         //     contractAddressNFT: SBTAddress,
//         //     numberOfNFTs: 1,
//         //     account: signer.address,
//         //     pgpPrivateKey: pgpDecryptedPvtKey,
//         //     env: 'staging'
//         // });

//         console.log('Group created:', response);
//     } catch (error) {
//         console.error('Error creating group:', error);
//     }
    console.log("hoge");
}
// })();

module.exports = {
    updatePushGroup,
};