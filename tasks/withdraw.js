const { types } = require('hardhat/config');

task('withdraw', 'Withdraw', async (taskArgs, hre) => {
  const { from, to, value } = taskArgs;
  const [owner] = await hre.ethers.getSigners();
  const Donate = await hre.ethers.getContractFactory('Donate');
  const donate = await Donate.attach(from);

  const tx = await donate.connect(owner).withdraw(to, value);
  console.log('In progress');
  await tx.wait();
  console.log('Withdrawn');
})
  .addParam('from', 'Contract address', undefined, types.address)
  .addParam('to', 'Receiver address', undefined, types.address)
  .addParam('value', 'Wei', undefined, types.string);
