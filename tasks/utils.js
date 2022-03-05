async function getDonateContract(hre, contract) {
  const Donate = await hre.ethers.getContractFactory('Donate');
  return await Donate.attach(contract);
}

module.exports = { getDonateContract };