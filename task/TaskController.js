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

	async withdraw(taskArgs, hre) {
		const {from, to} = taskArgs;

		const [owner] = await hre.ethers.getSigners();

		const Donate = await hre.ethers.getContractFactory("Donate");
		const donate = await Donate.attach(from)

		const tx = await donate.connect(owner).withdraw(to)

		await tx.wait()
		console.log('Withdrawn');
	}

	async deposit(taskArgs, hre) {
		const [owner] = await hre.ethers.getSigners();
		const {to, value} = taskArgs

		const Donate = await hre.ethers.getContractFactory("Donate");
		const donate = await Donate.attach(to)

		const tx = await donate.connect(owner).deposit({value})
		await tx.wait()

		const ownerBalance = (await owner.getBalance()).toString()
		const contractBalance = (await web3.eth.getBalance(to)).toString()

		console.log('Owner balance:', web3.utils.fromWei(ownerBalance, "ether"), "ETH");
		console.log('Smart Contract:', web3.utils.fromWei(contractBalance, "ether"), "ETH");
	}
}

module.exports = new TaskController()