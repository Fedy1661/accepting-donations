require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-web3');
require('solidity-coverage');

const taskController = require('./task/TaskController');
const { types } = require('hardhat/config');

require('dotenv').config();

task('deposit', 'Deposit to smart-contract', taskController.deposit)
  .addParam('to', 'Contract address', undefined, types.address)
  .addParam('value', 'Value', undefined, types.int);

task('withdraw', 'Withdraw', taskController.withdraw)
  .addParam('from', 'Contract address', undefined, types.address)
  .addParam('to', 'Receiver address', undefined, types.address)
  .addParam('value', 'Wei', undefined, types.int);

task('senders', 'Get the list of senders', taskController.getSenders)
  .addParam('contract', 'Contract address', undefined, types.address);

task('sender', 'Get the sender\'s total amount', taskController.getTotalSumOfSender)
  .addParam('contract', 'Contract address', undefined, types.address)
  .addParam('sender', 'Sender address', undefined, types.address);

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
      accounts: process.env.RINKEBY_PRIVATE_KEY !== undefined ? [process.env.RINKEBY_PRIVATE_KEY] : []
    }
  }
};
