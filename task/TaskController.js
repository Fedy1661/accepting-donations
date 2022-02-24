class TaskController {

  async deposit(taskArgs, hre) {
    const [owner] = await hre.ethers.getSigners();
    const { to, value } = taskArgs;
    const Donate = await hre.ethers.getContractFactory('Donate');
    const donate = await Donate.attach(to);


    const tx = await donate.connect(owner).deposit({ value });
    console.log('In progress');

    await tx.wait();
    console.log('Deposited');

    const ownerBalance = (await owner.getBalance()).toString();
    const contractBalance = (await web3.eth.getBalance(to)).toString();

    console.log('Owner balance:', web3.utils.fromWei(ownerBalance, 'ether'), 'ETH');
    console.log('Smart Contract:', web3.utils.fromWei(contractBalance, 'ether'), 'ETH');
  }

  async withdraw(taskArgs, hre) {
    const { from, to, value } = taskArgs;
    const [owner] = await hre.ethers.getSigners();
    const Donate = await hre.ethers.getContractFactory('Donate');
    const donate = await Donate.attach(from);

    const tx = await donate.connect(owner).withdraw(to, value);
    console.log('In progress');
    await tx.wait();
    console.log('Withdrawn');
  }

  async getSenders(taskArgs, hre) {
    const { contract } = taskArgs;
    const [owner] = await hre.ethers.getSigners();
    const Donate = await hre.ethers.getContractFactory('Donate');
    const donate = await Donate.attach(contract);

    const tx = await donate.connect(owner).getSenders();
    console.log(tx.join('\n'));
  }

  async getTotalSumOfSender(taskArgs, hre) {
    const { contract, sender } = taskArgs;
    const [owner] = await hre.ethers.getSigners();
    const Donate = await hre.ethers.getContractFactory('Donate');
    const donate = await Donate.attach(contract);

    const tx = await donate.connect(owner).getTotalSumOfSender(sender);
    console.log(hre.ethers.utils.formatEther(tx), 'ETH');
  }
}

module.exports = new TaskController();
