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

    function withdraw(address payable _to) external {
        require(msg.sender == owner, 'You should be an owner');
        address thisContract = address(this);
        _to.transfer(thisContract.balance);
    }
}