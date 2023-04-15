require("dotenv").config({ path: '../ethtokyo23-main/.env' });
const { MUMBAI_ALCHEMY_KEY, POLYGON_ALCHEMY_KEY, MUMBAI_RPC, POLYGON_RPC, PRIVATE_KEY, POLYGONSCAN_KEY } = process.env;

const PushAPI = require('@pushprotocol/restapi');
const ethers = require('ethers');
const ENV =  require('@pushprotocol/restapi/src/lib/constants');

// Replace with your private key and provider URL
const privateKey = PRIVATE_KEY;
const providerURL = `${MUMBAI_RPC}${MUMBAI_ALCHEMY_KEY}`;

// Initialize the signer
const provider = new ethers.providers.JsonRpcProvider(providerURL);
const signer = new ethers.Wallet(privateKey, provider);

// Replace with your desired group details
const groupName = 'WorldIdChat';
const groupDescription = 'This is the official group for Push Protocol';
const groupImage = 'https://pbs.twimg.com/profile_images/1628988940685541377/aMn29WBz_400x400.jpg';
const members = [
    // 'eip155:0x9e60c47edF21fa5e5Af33347680B3971F2FfD464',
    // 'eip155:0xEE860E9d8eCBFfEa3D27Eb76E5B923C2E9488ACf'
];
const admins = []; //['eip155:0x2EdD41ED862fad13D4820916256d38809f50E6CC'];
const isPublic = true;
const SBTAddress = 'eip155:80001:0x49c320c2fE782038277B9a185F1aE656F0E224cB';

(async () => {
    try {
        // const user2 = await PushAPI.user.create({
        //     // @ts-ignore
        //     signer: signer,
        //     env: 'staging'
        //   })

        const user = await PushAPI.user.get({
            account: `eip155:${signer.address}`,
            env: 'staging'
        });


        if (!user.encryptedPrivateKey) {
            console.error('Encrypted private key not found in the user object');
            return;
        }

        const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
            encryptedPGPPrivateKey: user.encryptedPrivateKey,
            signer: signer,
            env: 'staging'
        });

        const response = await PushAPI.chat.createGroup({
            groupName,
            groupDescription,
            members,
            groupImage,
            admins,
            isPublic,
            contractAddressNFT: SBTAddress,
            numberOfNFTs: 1,
            account: signer.address,
            pgpPrivateKey: pgpDecryptedPvtKey,
            env: 'staging'
        });

        console.log('Group created:', response);
    } catch (error) {
        console.error('Error creating group:', error);
    }
})();