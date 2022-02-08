// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Donate {
    address public owner;
    mapping(address => uint) public payments;

    constructor(){
        owner = msg.sender;
    }

    function donate() external payable {
        payments[msg.sender] = msg.value;
    }

    function withdraw(address payable wallet) external {
        require(msg.sender == owner, 'You should be an owner');
        address currentWallet = address(this);
        wallet.transfer(currentWallet.balance);
    }
}