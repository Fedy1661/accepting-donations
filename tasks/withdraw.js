const { types } = require('hardhat/config');
const { getDonateContract } = require('./utils');

task('withdraw', 'Withdraw')
  .addParam('from', 'Contract address', undefined, types.address)
  .addParam('to', 'Receiver address', undefined, types.address)
  .addParam('value', 'Wei', undefined, types.string)
  .setAction(async (taskArgs, hre) => {
    const { from, to, value } = taskArgs;
    const [owner] = await hre.ethers.getSigners();
    const donate = await getDonateContract(hre, from);

    const tx = await donate.connect(owner).withdraw(to, value);
    console.log('In progress');
    await tx.wait();
    console.log('Withdrawn');
  });
