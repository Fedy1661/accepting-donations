const {expect} = require('chai')

describe('Crypton contract', () => {
	let Donate, donate, owner, addr1

	beforeEach(async () => {
		Donate = await ethers.getContractFactory('Donate');
		donate = await Donate.deploy();
		[owner, addr1] = await ethers.getSigners();
	})

	describe('Withdraw', () => {
		it('Withdrawing is working', async () => {
			expect(await donate.provider.getBalance(donate.address)).to.equal(0)
			await donate.connect(addr1).deposit({value: 101000});
			expect(await donate.provider.getBalance(donate.address)).to.not.equal(0)
			await donate.connect(owner).withdraw(owner.address)
			expect(await donate.provider.getBalance(donate.address)).to.equal(0)
		});

		it('You can\'t WITHDRAW if you\'re not the owner', async () => {
			const tx = donate.connect(addr1).withdraw(addr1.address)
			await expect(tx).to.be.revertedWith('You should be an owner')
		})

		it('You can WITHDRAW if you\'re the owner', async () => {
			const tx = donate.connect(owner).withdraw(owner.address)
			await expect(tx).not.to.be.revertedWith('You should be an owner')
		})
	});

	describe('Donate', () => {
		it('You can donate', async () => {
			expect(await donate.provider.getBalance(donate.address)).to.equal(0)
			await donate.connect(addr1).deposit({value: 101000})
			expect(await donate.provider.getBalance(donate.address)).to.not.equal(0)
		})

		it('You can show donate for address', async () => {
			await donate.connect(addr1).deposit({value: 10100})
			expect(await donate.connect(addr1).payments(addr1.address)).to.equal(10100)
		})
	})
})
