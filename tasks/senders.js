const { types } = require('hardhat/config');
const { getDonateContract } = require('./utils');

task('senders', 'Get the list of senders', async (taskArgs, hre) => {
    const { contract } = taskArgs;
    const donate = await getDonateContract(hre, contract);

    const tx = await donate.getSenders();
    console.log(tx.join('\n'));
  }
)
  .addParam('contract', 'Contract address', undefined, types.address);
