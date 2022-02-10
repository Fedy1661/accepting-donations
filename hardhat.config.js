require('@nomiclabs/hardhat-waffle')
require("@nomiclabs/hardhat-web3")

const taskController = require("./task/TaskController");
const {types} = require("hardhat/config");

require('dotenv').config()

task('accounts', 'Prints the list of accounts', taskController.accounts)
task('owner', 'Get owner address', taskController.owner)
task("balance", "Prints an account's balance", taskController.balance)
	.addParam("account", "The account's address", undefined, types.address);

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: '0.8.4',
	networks: {
		rinkeby: {
			url: process.env.ALCHEMY_API_URL,
			accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`]
		}
	}
}
