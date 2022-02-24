const chai = require("chai");
const {expect} = chai
const {solidity} = require("ethereum-waffle");
const {InvalidInputError} = require("hardhat/internal/core/providers/errors");
const {utils: {Logger: {errors}}, constants: {WeiPerEther}} = require('ethers')

chai.use(solidity);

describe('Crypton contract', () => {
	let Donate, donate, owner, addr1

	beforeEach(async () => {
		Donate = await ethers.getContractFactory('Donate');
		donate = await Donate.deploy();
		[owner, addr1] = await ethers.getSigners();
	})

	describe('Owner', () => {
		it('Correct owner', async () => {
			const from = donate.deployTransaction.from;
			await expect(from).to.equal(owner.address)
		});
	});

	describe('SenderList', () => {
		it('should remain unchanged when sending 0 Wei', async () => {
			await donate.connect(addr1).deposit({value: 0})

			const senders = await donate.connect(addr1).getSenders();
			expect(senders).to.not.contain(addr1.address)
		});
		it('should be added the sender\'s address when sending more than 0 Wei', async () => {
			await donate.connect(addr1).deposit({value: 1})

			const senders = await donate.connect(addr1).getSenders()
			expect(senders).to.contain(addr1.address)
		});
		it('should contain a single instance of address', async () => {
			let senders = await donate.getSenders()

			expect(senders).to.be.an('array').that.is.empty
			const value = WeiPerEther

			await donate.connect(addr1).deposit({value})
			await donate.connect(addr1).deposit({value})
			await donate.connect(addr1).deposit({value})

			senders = await donate.getSenders()

			expect(senders).have.lengthOf(1)
		});
		it('should return an array', async () => {
			const tx = await donate.getSenders()
			expect(tx).to.be.an('array')
		});
		it('should return the correct data', async () => {
			const value = 1
			await donate.connect(owner).deposit({value})
			await donate.connect(addr1).deposit({value})

			const tx = await donate.getSenders()
			expect(tx).to.deep.equal([owner.address, addr1.address])
		});
		it('should throw error when sending negative Wei', async () => {
			try {
				await donate.connect(addr1).deposit({value: -1});
				expect.fail()
			} catch (error) {
				expect(error)
					.to.have.property('code')
					.be.equal(errors.INVALID_ARGUMENT)
			}
		});
		it('should contain correct addresses', async () => {
			await donate.connect(owner).deposit({value: 26022016})
			const [sender] = await donate.getSenders();

			expect(sender).to.be.properAddress
		});
	});

	describe('SenderStruct', () => {
		it('should return user\'s total amount', async () => {
			const value = 1
			await donate.connect(addr1).deposit({value})

			const tx = await donate.getTotalSumOfSender(addr1.address)
			expect(tx).to.be.equal(value)
		});
		it('should return 0 when user has not deposited', async () => {
			const tx = await donate.getTotalSumOfSender(addr1.address)
			expect(tx).to.be.equal(0)
		});
		it('should increase the user\'s total amount', async () => {
			const value = 1

			await donate.connect(addr1).deposit({value})
			await donate.connect(addr1).deposit({value})

			const tx = await donate.getTotalSumOfSender(addr1.address)
			expect(tx).to.be.equal(value * 2)
		});
	});

	describe('Deposit', () => {
		it('should be accessible', async () => {
			const tx = donate.connect(addr1).deposit({value: 26022016})
			await expect(tx).to.not.be.reverted
		});
		it('should increase contract balance', async () => {
			const value = 1;
			const tx = await donate.connect(addr1).deposit({value});
			await expect(tx).to.changeEtherBalance(donate, value);
		})
		it('should throw error when deposit is equal to its balance', async () => {
			const userBalance = await donate.provider.getBalance(addr1.address)

			try {
				await donate.connect(addr1).deposit({value: userBalance})
				expect.fail()
			} catch (error) {
				expect(error).to.be.an.instanceof(InvalidInputError)
			}
		});
		it('should throw error when user does not have enough Wei for the transaction', async () => {
			const userBalance = await donate.provider.getBalance(addr1.address)

			try {
				await donate.connect(addr1).deposit({value: userBalance * 10});
				expect.fail()
			} catch (error) {
				expect(error)
					.to.have.property('code')
					.be.equal(errors.NUMERIC_FAULT)
			}
		});
	});

	describe('Withdraw', () => {
		it('should be successful when user is owner', async () => {
			const value = 100
			await donate.connect(addr1).deposit({value})

			const tx = donate.withdraw(value, owner.address)
			await expect(tx).to.not.be.revertedWith('You should be an owner')
		});
		it('should throw error when user is not owner', async () => {
			const tx = donate.connect(addr1).withdraw(0, addr1.address)
			await expect(tx).to.be.revertedWith('You should be an owner')
		});
		it('should throw error when value greater than contract balance', async () => {
			const value = 100
			await donate.connect(addr1).deposit({value})
			const tx = donate.withdraw(value * 2, owner.address)

			await expect(tx).to.be.reverted
		});
		it('should throw error when value is negative', async () => {
			try {
				await donate.withdraw(-1, owner.address)
				expect.fail()
			} catch (error) {
				expect(error)
					.to.have.property('code')
					.be.equal(errors.INVALID_ARGUMENT)
			}
		});
	});

})
