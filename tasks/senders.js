const { types } = require('hardhat/config');
task('senders', 'Get the list of senders', async (taskArgs, hre) => {
    const { contract } = taskArgs;
    const [owner] = await hre.ethers.getSigners();
    const Donate = await hre.ethers.getContractFactory('Donate');
    const donate = await Donate.attach(contract);

    const tx = await donate.connect(owner).getSenders();
    console.log(tx.join('\n'));
  }
)
  .addParam('contract', 'Contract address', undefined, types.address);
