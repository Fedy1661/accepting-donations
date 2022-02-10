class TaskController {
	async accounts(taskArgs, hre) {
		const accounts = await hre.ethers.getSigners()

		for (const account of accounts) {
			console.log(account.address)
		}
	}

	async owner(taskArgs, hre) {
		const [owner] = await hre.ethers.getSigners();
		console.log(owner.address);
	}

	async balance(taskArgs) {
		const account = web3.utils.toChecksumAddress(taskArgs.account);
		const balance = await web3.eth.getBalance(account);

		console.log(web3.utils.fromWei(balance, "ether"), "ETH");
	}
}

module.exports = new TaskController()