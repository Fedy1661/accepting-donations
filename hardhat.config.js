require('@nomiclabs/hardhat-waffle')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners()

	for (const account of accounts) {
		console.log(account.address)
	}
})

const ALCHEMY_API_KEY = 'https://eth-rinkeby.alchemyapi.io/v2/e9xgNr2pI7_LBL8FxdS9NM5f_1KLwv08'
const RINKEBY_PRIVATE_KEY = '931215a3e3020ca5e709b1679835c47d5cf8208f1a45d93aa974b5d57b682619'

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: '0.8.4',
	networks: {
		rinkeby: {
			url: ALCHEMY_API_KEY,
			accounts: [`0x${RINKEBY_PRIVATE_KEY}`]
		}
	}
}
