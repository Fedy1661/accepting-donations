require('@nomiclabs/hardhat-waffle')
require("@nomiclabs/hardhat-web3")

const taskController = require("./task/TaskController");
const {types} = require("hardhat/config");

require('dotenv').config()

task('accounts', 'Prints the list of accounts', taskController.accounts)

task('owner', 'Get owner address', taskController.owner)

task('withdraw', 'Withdraw', taskController.withdraw)
	.addParam("to", "Receiver address", undefined, types.address)
	.addParam("from", "Sender address", undefined, types.address)

task('deposit', 'Deposit to smart-contract', taskController.deposit)
	.addParam("to", "Receiver address", undefined, types.address)
	.addParam("value", "Value", undefined, types.int)

task("balance", "Prints an account's balance", taskController.balance)
	.addParam("account", "The account's address", undefined, types.address);

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
}
