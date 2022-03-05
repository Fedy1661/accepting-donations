require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-web3');
require('solidity-coverage');
require("./tasks")
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;

module.exports = {
  defaultNetwork: 'hardhat',
  solidity: '0.8.4',
  networks: {
    hardhat: {},
    rinkeby: {
      url: ALCHEMY_API_URL,
      accounts: RINKEBY_PRIVATE_KEY !== undefined ? [RINKEBY_PRIVATE_KEY] : []
    }
  }
};
