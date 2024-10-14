require("@nomicfoundation/hardhat-ignition-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    'sepolia': {
      url: 'https://eth-sepolia.g.alchemy.com/v2/JNWtps18nPJ35EutskQtK9-LhwBSVj64',
      accounts: [ 'fa3d4bf4f06a3e02f81e4da4702938c98b05ba4f834bb71427b32edf4d802f00' ]
    }
  }
};
