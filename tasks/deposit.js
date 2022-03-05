const { types } = require('hardhat/config');

task('deposit', 'Deposit to smart-contract', async (taskArgs, hre) => {
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
})
  .addParam('to', 'Contract address', undefined, types.address)
  .addParam('value', 'Wei', undefined, types.string);
