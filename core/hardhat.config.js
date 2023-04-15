require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: '../.env' });
const { MUMBAI_ALCHEMY_KEY, POLYGON_ALCHEMY_KEY, MUMBAI_RPC, POLYGON_RPC, PRIVATE_KEY, POLYGONSCAN_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
      url: `${MUMBAI_RPC}${MUMBAI_ALCHEMY_KEY}`,
      //url: `${MUMBAI_ENV}`,
      accounts: [PRIVATE_KEY]
    },
    polygon: {
      url: `${POLYGON_RPC}${POLYGON_ALCHEMY_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    scrollAlpha: {
      url: 'https://alpha-rpc.scroll.io/l2' || '',
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      scrollAlpha: 'abc',
    },
    //apiKey : POLYGONSCAN_KEY
    customChains: [
      {
        network: 'scrollAlpha',
        chainId: 534353,
        urls: {
          apiURL: 'https://blockscout.scroll.io/api',
          browserURL: 'https://blockscout.scroll.io/',
        },
      },
    ]
  }
};