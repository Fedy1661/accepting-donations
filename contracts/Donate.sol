// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Donate {
    address owner;
    mapping(address => uint) public payments;

    constructor(){
        owner = msg.sender;
    }

    function deposit() external payable {
        payments[msg.sender] = msg.value;
    }

    function withdraw(address payable wallet) external {
        require(msg.sender == owner, 'You should be an owner');
        address currentWallet = address(this);
        wallet.transfer(currentWallet.balance);
    }
}