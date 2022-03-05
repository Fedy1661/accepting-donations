require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-web3');
require('solidity-coverage');
require("./tasks")
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'hardhat',
  solidity: '0.8.4',
  networks: {
    hardhat: {},
    rinkeby: {
      url: process.env.ALCHEMY_API_URL,
      accounts: process.env.RINKEBY_PRIVATE_KEY ? [process.env.RINKEBY_PRIVATE_KEY] : []
    }
  }
};
