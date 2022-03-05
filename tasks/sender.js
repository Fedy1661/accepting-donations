const { types } = require('hardhat/config');
const { getDonateContract } = require('./utils');

task('sender', 'Get the sender\'s total amount', async (taskArgs, hre) => {
    const { contract, sender } = taskArgs;
    const [owner] = await hre.ethers.getSigners();
    const donate = await getDonateContract(hre, contract);

    const tx = await donate.connect(owner).getTotalSumOfSender(sender);
    console.log(hre.ethers.utils.formatEther(tx), 'ETH');
  }
)
  .addParam('contract', 'Contract address', undefined, types.address)
  .addParam('sender', 'Sender address', undefined, types.address);
